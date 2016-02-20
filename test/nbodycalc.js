var assert = require('assert');


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


var nbodycalc = require((process.env.APP_DIR_FOR_CODE_COVERAGE || '../lib/') + 'nbodycalc.js').withMathFunc(MathFunc);


describe('GravitySimulator', function () {
    describe('when created', function () {
        it('should privide valid object', function () {
              var sim = new nbodycalc.GravitySimulator();

              assert.notEqual(undefined, sim);
        });
    });

    describe('when one body moving', function () {
        it('should move with constant speed straight forward', function () {
              var sim = new nbodycalc.GravitySimulator();
              var body = {
                position: [0,0,0],
                velocity: [1,0,0],
                mass: 1000000.0
              };

              sim.addBody(body);
              sim.updateTime(1.0);
              sim.updateTime(1.0);

              assert.deepEqual([2,0,0], body.position);
        });
    })
});

