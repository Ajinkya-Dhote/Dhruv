sap.ui.define(["sap/ui/core/UIComponent"],
	function (UIComponent) {
	"use strict";

	return UIComponent.extend("sap.ui.core.sample.TypeTimeAsTime.Component", {

		metadata: {
			rootView: {
				"viewName": "sap.ui.core.sample.TypeTimeAsTime.V",
				"type": "XML",
				"async": true
			},
			dependencies: {
				libs: [
					"sap.m",
					"sap.ui.layout"
				]
			},
			config: {
				sample: {
					files: [
						"V.view.xml",
						"C.controller.js"
					]
				}
			}
		}
	});
});