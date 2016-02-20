lethexa-nbodycalc
-----------------

Multibody-gravity simulation (no gui, only the calculations).


Installation
------------

	npm install
	grunt

Usage
-----
        var MathFunc = {
		nullVector: function() {
			return [0,0,0];
		},
                add: function(a, b) {
                        return [
                                a[0] + b[0],
                                a[1] + b[1],
                                a[2] + b[2]
                        ];
                },
                sub: function(a, b) {
                        return [
                                a[0] - b[0],
                                a[1] - b[1],
                                a[2] - b[2]
                        ];
                },
                mulScalar: function(a, s) {
                        return [
                                a[0] * s,
                                a[1] * s,
                                a[2] * s
                        ];
                },
                dot: function(a, b) {
                        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
                },
                lengthSquared: function(a) {
                        return a[0]*a[0] + a[1]*a[1] + a[2]*a[2];
                }
        };



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



