sap.ui.define(function () {
	"use strict";

	return {
		name: "QUnit TestSuite for sap.tnt",
		defaults: {
			group: "Default",
			qunit: {
				version: "edge"
			},
			sinon: {
				version: 1
			},
			ui5: {
				language: "en",
				rtl: false,
				libs: ["sap.tnt"],
				"xx-waitForTheme": true
			},
			coverage: {
				only: ["sap/tnt"]
			},
			loader: {
				paths: {
					"sap/ui/demo/mock": "test-resources/sap/ui/documentation/sdk/",
					"qunit": "test-resources/sap/tnt/qunit/"
				}
			},
			page: "test-resources/sap/tnt/qunit/testsandbox.qunit.html?test={name}",
			autostart: true
		},
		tests: {
			"demokit/toolpageapp/webapp/test/integration/opaTests": {
				title: "Integration Tests for ToolPage app",
				ui5: {
					preload: "async"
				},
				loader: {
					paths: {
						"sap/ui/demo/toolpageapp": "test-resources/sap/tnt/demokit/toolpageapp/webapp/"
					}
				},
				group: "Demokit Other Content",
				module: [
					"sap/ui/demo/toolpageapp/test/integration/AllJourneys"
				],
				autostart: false
			},
			"InfoLabel": {
				coverage: {
					only : ["sap/tnt/InfoLabel"]
				}
			},
			"NavigationList": {
				coverage: {
					only : ["sap/tnt/NavigationList"]
				},
				sinon: {
					useFakeTimers: true
				}
			},
			"SideNavigation": {
				coverage: {
					only : ["sap/tnt/SideNavigation"]
				},
				sinon: {
					useFakeTimers: true
				}
			},
			"ToolHeader": {
				coverage: {
					only : ["sap/tnt/ToolHeader"]
				},
				sinon: {
					useFakeTimers: true
				}
			},
			"ToolPage": {
				coverage: {
					only : ["sap/tnt/ToolPage"]
				},
				sinon: {
					useFakeTimers: true
				}
			},
			"ExploredSamples": {
				loader: {
					paths: {
						"sap/ui/demo/mock": "test-resources/sap/ui/documentation/sdk/"
					}
				},
				runAfterLoader: "sap/ui/demo/mock/qunit/SampleTesterErrorHandler",
				qunit: {
					version: 2
				},
				sinon: {
					version: 1 // because MockServer is used by samples
				},
				ui5: {
					libs: ["sap.ui.layout", "sap.m", "sap.tnt", "sap.ui.documentation"],
					"xx-componentPreload": "off"
				},
				autostart: false
			}
		}
	};
});