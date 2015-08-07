var nbodycalc = require('./lib/nbodycalc');
var vecmat = require('lethexa-vecmat');

var sim = new nbodycalc.GravitySimulator();

var body1 = { 
	position: new vecmat.Vector3d(1.0, 0.0, 0.0),
	velocity: vecmat.makeNullVector3d(),
	mass: 1000000.0
};

var body2 = { 
	position: new vecmat.Vector3d(-1.0, 0.0, 0.0),
	velocity: vecmat.makeNullVector3d(),
	mass: 1000000.0
};

var body3 = { 
	position: new vecmat.Vector3d(0.0, 1.0, 0.0),
	velocity: vecmat.makeNullVector3d(),
	mass: 1000000.0
};



sim.addBody(body1);
sim.addBody(body2);
sim.addBody(body3);

for(var t=0;t<100;t++) {
	console.log('position1: ', body1.position);
	sim.updateTime(1.0);
}


