var nbodycalc = require('./lib/nbodycalc');
var vecmat = require('lethexa-vecmat');

var sim = new nbodycalc.GravitySimulator();

var body1 = { 
	position: new vecmat.Vector3d(1.0, 0.0, 0.0),
	velocity: vecmat.makeNullVector3d(),
	mass: 100000.0
};

var body2 = { 
	position: new vecmat.Vector3d(-1.0, 0.0, 0.0),
	velocity: vecmat.makeNullVector3d(),
	mass: 100000.0
};

sim.addBody(body1);
sim.addBody(body2);

sim.updateTime(1.0);
sim.updateTime(1.0);
sim.updateTime(1.0);
sim.updateTime(1.0);


