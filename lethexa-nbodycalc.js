(function (exports) {
  'use strict';

  /**
   * Creates a motionpredictor with pluggable Math functions.
   */
  exports.withMathFunc = function(mf) {
    return {

      /**
       * Simulates the movement under gravity influence
       * @class GravitySimulator
       * @constructor
       */
      GravitySimulator: function() {
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
          var dR = mf.sub(R1, R2);
          var RDiffMag = Math.sqrt(mf.lengthSquared(dR));
          if(RDiffMag === 0.0) {
            return mf.nullVector();
          }
          var D = G * M / (RDiffMag * RDiffMag * RDiffMag);
          return mf.mulScalar(dR, D);
        };

        var calcAccelForObject = function( body, G, R ) {
          var accel = mf.nullVector();

          bodies.forEach(function(otherBody) {
            if(otherBody === body)
              return;
            accel = mf.add(accel, calcAccelFromPos(G, otherBody.mass, otherBody.position, R) );
          });
          return accel;
        };

        var multiAdd = function() {
          var r = mf.nullVector();
          for(var i=0;i<arguments.length;i++) {
            r = mf.add(r, arguments[i]);
	  }
          return r;
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

            var KbR = mf.add(R, mf.mulScalar(KaV, halfDiffT) );
            var KbV = mf.add(V, mf.mulScalar(KaA, halfDiffT) );
            var KbA = calcAccelForObject(otherBody, GRAVITY_CONSTANT, KbR);

            var KcR = mf.add(R, mf.mulScalar(KbV, halfDiffT) );
            var KcV = mf.add(V, mf.mulScalar(KbA, halfDiffT) );
            var KcA = calcAccelForObject(otherBody, GRAVITY_CONSTANT, KcR);

            var KdR = mf.add(R, mf.mulScalar(KcV, dt) );
            var KdV = mf.add(V, mf.mulScalar(KcA, dt) );
            var KdA = calcAccelForObject(otherBody, GRAVITY_CONSTANT, KdR);

            var vfV = mf.mulScalar( multiAdd(KaV, mf.mulScalar(KbV, 2.0), mf.mulScalar(KcV, 2.0), KdV), 1.0/6.0 );
            var vfA = mf.mulScalar( multiAdd(KaA, mf.mulScalar(KbA, 2.0), mf.mulScalar(KcA, 2.0), KdA), 1.0/6.0 );
 
            R = mf.add(R, mf.mulScalar(vfV, dt) );
            V = mf.add(V, mf.mulScalar(vfA, dt) );

            otherBody.position = R;
            otherBody.velocity = V;
          });
        };
      }


    };
  };
})(typeof exports === 'undefined' ? this.nbodycalc = {} : exports);

