var nbodycalc = require('./lib/nbodycalc');
var vecmat = require('lethexa-vecmat');

var sim = new nbodycalc.GravitySimulator();

var body1 = { 
	position: vecmat.makeNullVector3d(),
	velocity: vecmat.makeNullVector3d(),
	mass: 1.0
};

sim.addBody(body1);

console.log(body1);
sim.updateTime(1.0);
console.log(body1);


