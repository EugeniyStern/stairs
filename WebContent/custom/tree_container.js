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
			//jQuery.sap.require('stairs/js/math');
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
						window.innerHeight * 0.9);
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