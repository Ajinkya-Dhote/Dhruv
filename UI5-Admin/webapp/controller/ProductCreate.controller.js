sap.ui.define([
	"sap/ui/Device",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
	"els/org/pratideen/controller/BaseController"
], function(Device, Controller, Filter, FilterOperator, JSONModel, BaseController) {
	"use strict";

	return BaseController.extend("els.org.pratideen.controller.ProductCreate", {

		onInit: function() {

			this.getRouter().attachRouteMatched(this.onRouteMatched, this);

		},

		
		onRouteMatched: function(oEvent) {
			var oParameters = oEvent.getParameters();
			if (oParameters.name !== "productdisp") {
				return;
			}
		
		},
	
	});

});
