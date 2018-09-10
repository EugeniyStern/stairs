sap.ui.define([ 'sap/ui/core/Control' ], function(Control) {
	"use strict";

	var tree_container = Control.extend("stairs.custom.tree_container", {
		metadata : {
			properties : {
				matrix : {
					type : "string",
					defaultValue : ''
				},
				camera_pi : {
					type : "number",
					defaultValue : 0
				},
				camera_theta : {
					type : "number",
					defaultValue : 90
				},
				camera_r : {
					type : "number",
					defaultValue : 400
				},
				eval : {
					type : "string",
					defaultValue : ''
				}
			},
		},

		That : {},
		init : function() {
			jQuery.sap.require('stairs/js/jsondata');
			jQuery.sap.require('stairs/js/three');
			// jQuery.sap.require('stairs/js/math');
			jQuery.sap.require('stairs/js/TrackballControls');
			ComponentId.id = this.getId() + "-ThreeJSCont";
			this._html = new sap.ui.core.HTML({
				content : "<div style='height:100%;width:100%;' id='"
						+ this.getId() + "-ThreeJSCont'></div>"
			});
		},
		renderer : function(oRm, oControl) {
			oRm.write("<div style='height:100%;width:100%;margin:0px;' ");
			oRm.writeControlData(oControl); // writes
			oRm.write(">");
			oRm.renderControl(oControl._html);
			oRm.write("</div>");
		},
		// an event handler:
		onAfterRendering : function() {
			if (!this.initialized) { // after
				this.initialized = true;
				var oContElement = jQuery.sap.domById(this.getId()
						+ "-ThreeJSCont");
				ComponentId.id = this.getId() + "-ThreeJSCont";

				this.renderer = new THREE.WebGLRenderer({
					alpha : true
				});
				this.renderer.setSize(window.innerWidth * 0.75,
						window.innerHeight * 0.8);
				oContElement.appendChild(this.renderer.domElement);

				this.scene = new THREE.Scene();
				// Camera
				this.camera = new THREE.PerspectiveCamera(70, window.innerWidth
						/ window.innerHeight, 1, 20000);
				this.camera.position.set(300, 180, 600);
				this.camera.lookAt(this.scene.position);

				// axes
				this.axes2 = new THREE.AxisHelper(300);
				this.scene.add(this.axes2);

				this.controls = new THREE.TrackballControls(this.camera,
						this.renderer.domElement);
				this.controls.minDistance = 50;
				this.controls.maxDistance = 1800;

				this.light = new THREE.DirectionalLight(0xffffff);

				// Scene
				this.scene.add(this.light);

				this.lightAmbient = new THREE.AmbientLight(0x606060); // soft
				// white
				// light
				this.scene.add(this.lightAmbient);

				// find intersections
				var vector = new THREE.Vector3();
				var raycaster = new THREE.Raycaster();
				this.renderer.render(this.scene, this.camera);

				requestAnimationFrame(this.animate);
				this.camera.lookAt(this.scene.position);
				ComponentId.Objects = this;

				// draw something
				var light, object;
				var scene = this.scene;
				var map = new THREE.TextureLoader()
						.load('texture/world-cup-2018-day-5.png');
				map.wrapS = map.wrapT = THREE.RepeatWrapping;
				map.anisotropy = 16;
				var material = new THREE.MeshPhongMaterial({
					map : map,
					side : THREE.DoubleSide
				});
				//
				object = new THREE.Mesh(new THREE.SphereBufferGeometry(75, 20,
						10), material);
				object.position.set(-300, 0, 200);
				scene.add(object);
				object = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(75,
						1), material);
				object.position.set(-100, 0, 200);
				scene.add(object);
				object = new THREE.Mesh(new THREE.OctahedronBufferGeometry(75,
						2), material);
				object.position.set(100, 0, 200);
				scene.add(object);
				object = new THREE.Mesh(new THREE.TetrahedronBufferGeometry(75,
						0), material);
				object.position.set(300, 0, 200);
				scene.add(object);
				//
				object = new THREE.Mesh(new THREE.PlaneBufferGeometry(100, 100,
						4, 4), material);
				object.position.set(-300, 0, 0);
				scene.add(object);
				object = new THREE.Mesh(new THREE.BoxBufferGeometry(100, 100,
						100, 4, 4, 4), material);
				object.position.set(-100, 0, 0);
				scene.add(object);
				object = new THREE.Mesh(new THREE.CircleBufferGeometry(50, 20,
						0, Math.PI * 2), material);
				object.position.set(100, 0, 0);
				scene.add(object);
				object = new THREE.Mesh(new THREE.RingBufferGeometry(10, 50,
						20, 5, 0, Math.PI * 2), material);
				object.position.set(300, 0, 0);
				scene.add(object);
				//
				object = new THREE.Mesh(new THREE.CylinderBufferGeometry(25,
						75, 100, 40, 5), material);
				object.position.set(-300, 0, -200);
				scene.add(object);
				var points = [];
				for (var i = 0; i < 50; i++) {
					points.push(new THREE.Vector2(Math.sin(i * 0.2)
							* Math.sin(i * 0.1) * 15 + 50, (i - 5) * 2));
				}
				object = new THREE.Mesh(new THREE.LatheBufferGeometry(points,
						20), material);
				object.position.set(-100, 0, -200);
				scene.add(object);
				object = new THREE.Mesh(new THREE.TorusBufferGeometry(50, 20,
						20, 20), material);
				object.position.set(100, 0, -200);
				scene.add(object);
				object = new THREE.Mesh(new THREE.TorusKnotBufferGeometry(50,
						10, 50, 20), material);
				object.position.set(300, 0, -200);
				scene.add(object);
			} else {
			}

		},
		// an event handler:
		onclick : function(evt) { // when the
			// square is
			// clicked

		},
		onmousedown : function(evt) {

		},
		ontouchmove : function(evt) {
			// evt.originalEvent.clientY
		},
		onmousemove : function(evt) {

		},
		onmouseup : function(evt) {

		},
		onscroll : function(evt) {

		},
		animate : function(event) {
			var obj = ComponentId.Objects;
			requestAnimationFrame(obj.animate);

			obj.camera.lookAt(obj.scene.position);
			obj.light.position.set(obj.camera.position.x,
					obj.camera.position.y, obj.camera.position.z).normalize();

			obj.controls.update();

			obj.renderer.render(obj.scene, obj.camera);
		}
	});

	return tree_container;

});