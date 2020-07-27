/* global test */
sap.ui.define(["sap/ui/app/Application", "sap/ui/model/json/JSONModel", "sap/ui/core/Control", "sap/ui/core/UIComponent"], function (Application, JSONModel, Control, UIComponent) {

	test("Abstract", 1, function() {
		var oApp = new Application();
		ok(oApp.getMetadata().isAbstract(), "sap.ui.app.Application is abstract");
		oApp.destroy();
	});

	test("Config by Model", 1, function() {
		var oJSONModel = new JSONModel();
		oJSONModel.setData({
			foo : "bar"
		})
		var oApp = new Application({
			config : oJSONModel
		});
		equal(oApp.getConfig().getProperty("/foo"), "bar", "Model is set right");
		oApp.destroy();
	});

	test("Config by URI", 1, function() {
		var oApp = new Application({
			config : "testdata/config.json"
		});
		equal(oApp.getConfig().getProperty("/foo"), "bar", "Model is set right");
		oApp.destroy();
	});

	test("Config by URI - Error", 1, function() {
		throws(function() {
			var oApp = new Application({
				config : "someNotExistingUri.json"
			});
		}, /Could not load config file/, "Error is thrown when URI not exists");
		sap.ui.getApplication = undefined;
	});


	test("Only one Application is allowed", 2, function() {
		var oApp = new Application();
		ok(sap.ui.getApplication(), "Application is registered");
		throws(function() {
			var oApp = new Application();
		}, /Only one instance of sap.ui.app.Application is allowed/, "Error is thrown when a second instance is created");
		sap.ui.getApplication = undefined;
	});


	test("Root Property exists", 1, function() {
		var oApp = new Application({
			root : "main"
		});
		equal(oApp.getRoot(), "main", "Root property available");
		oApp.destroy();
	});

	test("Main function", 1, function() {
		var oApp = Application.extend("my.App", {
			main : function() {
				ok(true, "Main function called");
			}
		});
		var oApp = new my.App();
		oApp.destroy();
	});

	test("Root Component", 1, function() {
		Control.extend("my.Control", {
			renderer : function(oRm) {
				oRm.write("<div>works</div>");
			}
		});
		UIComponent.extend("my.Component", {
			createContent : function() {
				return new my.Control();
			}
		});
		var oApp = Application.extend("my.App", {
			createRootComponent : function() {
				return new my.Component();
			}
		});
		var oApp = new my.App({
			root : "main"
		});
		ok(oApp.getRootComponent());
		oApp.destroy();
	});
});
