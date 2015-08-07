Installation
------------

	npm install
	grunt

Usage
-----

	var vecmat = require('lethexa-vecmat');

	var pitch=0.1, yaw=0.2, distance=1000.0;
	var vec1 = vecmat.vector3dFromPolar(pitch, yaw, distance);

	var vec2 = vecmat.vector3dFromElements(1.0, 2.0, 3.0);

	var vec3 = vecmat.vector3dFromArray([1.0, 2.0, 3.0]);

	var vec4 = new vecmat.Vector3d(1.0, 2.0, 3.0);

	var vec5 = vec1.add(vec2);


Contributors
------------

* Tim Leerhoff <tleerhof@web.de>


