/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__(1);\n\n\n//////////////////\n// WEBPACK FOOTER\n// multi main\n// module id = 0\n// module chunks = 0\n//# sourceURL=webpack:///multi_main?");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("\"use strict\";\n\nvar _three = __webpack_require__(2);\n\nvar THREE = _interopRequireWildcard(_three);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nvar WIDTH = 600;\nvar HEIGHT = 300;\nvar canvas = document.getElementById(\"tex\");\ncanvas.width = 256;\ncanvas.height = 256;\nvar ctx = canvas.getContext(\"2d\");\nctx.font = '20pt Arial';\nctx.fillStyle = 'white';\nctx.fillRect(0, 0, canvas.width, canvas.height);\nctx.fillStyle = 'black';\nfor (var k = 0; k < 256; k++) {\n    var x = .1;\n    var f = k / 512 + 3.4;\n    for (var i = 0; i < 100; i++) {\n        x = f * x * (1 - x);\n    }\n    for (var i = 0; i < 200; i++) {\n        x = f * x * (1 - x);\n        ctx.fillRect(k, x * 256, 1, 1);\n    }\n}\nvar renderer = new THREE.WebGLRenderer({ antialias: true });\nrenderer.setSize(WIDTH, HEIGHT);\ndocument.getElementById('page').appendChild(renderer.domElement);\nvar scene = new THREE.Scene();\nvar camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);\ncamera.position.set(0, 0, 0);\nscene.add(camera);\nrenderer.setClearColor('#AAA');\nrenderer.setClearAlpha(1);\n// Create a light, set its position, and add it to the scene.\nvar light = new THREE.PointLight(0xffffff);\nlight.position.set(-100, 200, 100);\nscene.add(light);\nvar alight = new THREE.AmbientLight(0x404040); // soft white light\nscene.add(alight);\n// create the sphere's material\nvar sphereMaterial = new THREE.MeshLambertMaterial({\n    color: 0xCC0000\n});\nvar size = 100;\nvar precision = 16;\nvar canvasMap = new THREE.Texture(canvas);\nvar geometry = new THREE.PlaneGeometry(100, 100, 32);\nvar material = new THREE.MeshBasicMaterial({ map: canvasMap, side: THREE.DoubleSide });\nvar plane = new THREE.Mesh(geometry, material);\nplane.position.z = -200;\nscene.add(plane);\n//scene.add(sphere);\nfunction animate() {\n    requestAnimationFrame(animate);\n    canvasMap.needsUpdate = true;\n    plane.rotation.y += 0.01;\n    renderer.render(scene, camera);\n}\nanimate();\n\n//////////////////\n// WEBPACK FOOTER\n// ./src/index.tsx\n// module id = 1\n// module chunks = 0\n//# sourceURL=webpack:///./src/index.tsx?");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {


/***/ }
/******/ ]);