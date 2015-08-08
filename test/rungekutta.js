var assert = require('assert');
var integrator = require('../lib/rungekutta');


describe('RungeKutta', function () {
    describe('#nextStep()', function () {
        it('should return the correct result 1', function () {
		var rungekutta = new integrator.RungeKutta( function(x, y) {
			return 3 * x*x * y;
		}); 
		var x0 = 1, y0 = 2, h = 0.1;

		var result = rungekutta.nextStep(x0, y0, h);

            	assert.equal(1.1, Math.round(result.x1 * 1000.0) / 1000.0);
            	assert.equal(2.785, Math.round(result.y1 * 1000.0) / 1000.0);
        });
     
	it('should return the correct result 2', function () {
		var rungekutta = new integrator.RungeKutta( function(t, v) {
			return (1.0/1000.0 * (1000.0 - 10.0 * v)) * t;
		}); 
		var t0 = 0, v0 = 0, dt = 2.0;

		var result = rungekutta.nextStep(t0, v0, dt);

            	assert.equal(dt, Math.round(result.x1 * 1000.0) / 1000.0);
            	assert.equal(1.98, Math.round(result.y1 * 1000.0) / 1000.0);
        });
    });
});


