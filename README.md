lethexa-nbodycalc
-----------------

Multibody-gravity simulation using Runge-Kutta-Integration method.
There is an example in a website using canvas to show planet movements.

Installation
------------

	npm install
	grunt

(Example website on localhost:8000. Start with 'npm start')

![Example](https://raw.githubusercontent.com/lethexa/lethexa-nbodycalc/gh-pages/gravity.png)
The example shows 3 masses. One with big mass (red) in the center, the others with smaller masses (green, blue).

Usage
-----

	/////////////////////////////////////////////////
	// Definition of required vector math functions
	// as plugin for the calculations.
	// Change this to adapt to your favourite vector library.
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
	/////////////////////////////////////////////////


	var nbodycalc = require('lethexa-nbodycalc');
	var mynbodycalc = nbodycalc.withMathFunc(MathFunc);

	var bodies = [
		{
			position: [-1,-1,0],
			velocity: [0.03,0.001,0],
			mass: 1000000.0,
			color: '#00FF00'
		},
		{
			position: [0,0,0],
			velocity: [0,0,0],
			mass: 20000000.0,
			color: '#FF0000'
		},
		{
			position: [1,1,0],
			velocity: [-0.03,0,0],
			mass: 1000000.0,
			color: '#0000FF'
		}
	];

	//// THE EXAMPLE ////
	var sim = new mynbodycalc.GravitySimulator();

	// Add bodies to simulation
	for(var i=0;i<bodies.length;i++) {
		sim.addBody(bodies[i]);
	}

	
	// Do simulation timesteps.
	for(var t=0;t<100;t++) {
		console.log('position of body1: ', body1.position);
		sim.updateTime(1.0);
	}


License
-------

This library is published under MIT license.

