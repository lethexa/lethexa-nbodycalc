var vecmat = require('lethexa-vecmat');


/**
 * Simulates the movement under gravity influence
 * @class GravitySimulator
 * @constructor
 */
module.exports.GravitySimulator = function() {
	var bodies = [];
	var GRAVITY_CONSTANT = 6.67e-11; // Nm2/kg2

	/**
 	 * Add a body
 	 * @method addBody
 	 * @param body {Object} The moving body 
 	 */
	this.addBody = function( body ) {
		bodies.push(body);
	};	

	/**
 	 * Remove a body
 	 * @method removeBody
 	 * @param body {Object} The moving body 
 	 */
	this.removeBody = function( body ) {
		var index = bodies.indexOf(body);
		bodies.splice(index, 1);
	};	

	var calcAccelFromPos = function(G, M, R1, R2) {
		var dR = R1.sub(R2);
		var RDiffMag = dR.length();
		if(RDiffMag === 0.0) {
			return vecmat.makeNullVector3d();
		}
		var D = G * M / (RDiffMag * RDiffMag * RDiffMag);
		return dR.mul(D);
	};

	var calcAccelForObject = function( body, G, R ) {
		var accel = vecmat.makeNullVector3d();

		bodies.forEach(function(otherBody) {
			if(otherBody === body)
				return;
			accel = accel.add( calcAccelFromPos(G, otherBody.mass, otherBody.position, R) );
		});
		return accel;
	};

	/**
 	 * Updates the time and moves the bodies
 	 * @method updateTime
 	 * @param dt {Number} The time to move 
 	 */
	this.updateTime = function(dt) {
		bodies.forEach(function(otherBody) {
			// Integrieren nach Runge-Kutta...
			var R = otherBody.position;
			var V = otherBody.velocity;
			var A = calcAccelForObject(otherBody, GRAVITY_CONSTANT, R);

			//console.log('R:', R, 'V:', V);

			var halfDiffT = 0.5 * dt;
			var KaV = V;
			var KaA = A;

			var KbR = R.add( KaV.mul(halfDiffT) );
			var KbV = V.add( KaA.mul(halfDiffT) );
			var KbA = calcAccelForObject(otherBody, GRAVITY_CONSTANT, KbR);

			var KcR = R.add( KbV.mul(halfDiffT) );
			var KcV = V.add( KbA.mul(halfDiffT) );
			var KcA = calcAccelForObject(otherBody, GRAVITY_CONSTANT, KcR);

			var KdR = R.add( KcV.mul(dt) );
			var KdV = V.add( KcA.mul(dt) );
			var KdA = calcAccelForObject(otherBody, GRAVITY_CONSTANT, KdR);

			var vfV = (KaV.add(KbV.mul(2.0)).add(KcV.mul(2.0)).add(KdV)).mul(1.0/6.0);
			var vfA = (KaA.add(KbA.mul(2.0)).add(KcA.mul(2.0)).add(KdA)).mul(1.0/6.0);

			R = R.add( vfV.mul(dt) );
			V = V.add( vfA.mul(dt) );

			otherBody.position = R;
			otherBody.velocity = V;
		});
	};
};


/*
//
// Methoden-Implementierung
//
CVector3d vwsspace::CGravityTask::calcAccelForObject( base::THandle tMyHandle,
                                                      double dG,
                                                      const CVector3d& vR )
{
	CVector3d vAccel;

	for( vwsspace::THandleToEntityProps::const_iterator posIter = m_tIDToEntityProps.begin();
	     posIter != m_tIDToEntityProps.end();
	     posIter++ )
	{
		base::THandle tOtherHandle = (*posIter).first;
		if(tMyHandle == tOtherHandle)
			continue;

		base::IEntity* pEntity = SGSYS->getEntityPtr(tOtherHandle);
		if(pEntity == NULL)
			continue;

		//const vwsspace::CEntityProperties& rThatProps = (*posIter).second;
		const ICoordinateSys* pCoordSys = pEntity->getCoordinateSys();
		if(pCoordSys == NULL)
			continue;

		CVector3d vPos;
		if(tOtherHandle != m_tRefEntity)
		{
			vPos = pCoordSys->getPosVector();
		}

		vAccel += calcAccelFromPos(dG, pEntity->getMass(), vPos, vR);
	}

	return vAccel;
}


void vwsspace::CGravityTask::updateTime( base::TSchedTime tTimeDiff )
{
	for( vwsspace::THandleToEntityProps::iterator posIter = m_tIDToEntityProps.begin();
	     posIter != m_tIDToEntityProps.end();
	     posIter++ )
	{
		base::THandle tOtherHandle = (*posIter).first;

		if(m_tRefEntity == tOtherHandle)
			continue;

		base::IEntity* pEntity = SGSYS->getEntityPtr(tOtherHandle);
		if(pEntity == NULL)
			continue;

		ICoordinateSys* pCoordSys = pEntity->getCoordinateSys();
		if(pCoordSys == NULL)
			continue;

		//base::CEntityAbsPosVisitor AbsPosVisitor;
		//base::CEntityAbsVeloVisitor AbsVeloVisitor;
		//SGSYS->visitEntities( tOtherHandle, AbsPosVisitor );
		//SGSYS->visitEntities( tOtherHandle, AbsVeloVisitor );

		// Integrieren nach Runge-Kutta...
		//CVector3d R = AbsPosVisitor.getPosition();
		//CVector3d V = AbsVeloVisitor.getVelocity();

		// Integrieren nach Runge-Kutta...
		CVector3d R = pCoordSys->getPosVector();
		CVector3d V = pEntity->getVelocity();
		CVector3d A = calcAccelForObject(tOtherHandle, GRAVITY_CONSTANT, R);

		CVector3d KaV = V;
		CVector3d KaA = A;

		CVector3d KbR = R + 0.5 * tTimeDiff * KaV;
		CVector3d KbV = V + 0.5 * tTimeDiff * KaA;
		CVector3d KbA = calcAccelForObject(tOtherHandle, GRAVITY_CONSTANT, KbR);

		CVector3d KcR = R + 0.5 * tTimeDiff * KbV;
		CVector3d KcV = V + 0.5 * tTimeDiff * KbA;
		CVector3d KcA = calcAccelForObject(tOtherHandle, GRAVITY_CONSTANT, KcR);

		CVector3d KdR = R + tTimeDiff * KcV;
		CVector3d KdV = V + tTimeDiff * KcA;
		CVector3d KdA = calcAccelForObject(tOtherHandle, GRAVITY_CONSTANT, KdR);


		CVector3d vfV( (KaV + 2.0 * KbV + 2.0 * KcV + KdV) / 6.0 );
		CVector3d vfA( (KaA + 2.0 * KbA + 2.0 * KcA + KdA) / 6.0 );

		R += tTimeDiff * vfV;
		V += tTimeDiff * vfA;

		pCoordSys->setPosVector(R);
		pEntity->setVelocity(V);

		vwsspace::CEntityProperties& rThatProps = (*posIter).second;
		if( rThatProps.AlignToTrajectory )
		{
			CEulerAngles vRot(getRotationVector(V));
			pCoordSys->setRotVector(vRot);
		}

		base::CEntityTools& rTools = pEntity->getEntityTools();
		base::CTrajectory* pTrajectory = rTools.getTrajectory();
		if(pTrajectory != NULL)
		{
			pTrajectory->addPosition(R);
		}
	}
}
*/
