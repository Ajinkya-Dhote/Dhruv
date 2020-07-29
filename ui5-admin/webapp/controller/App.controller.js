sap.ui.define([
	"sap/ui/Device",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
	"els/org/pratideen/controller/BaseController"
], function(Device, Controller, Filter, FilterOperator, JSONModel, BaseController) {
	"use strict";

	return BaseController.extend("els.org.pratideen.controller.App", {

		onInit: function()
		{
			
		},
		onAfterRendering: function()
		{
			debugger;
			var oDashModel = this.getClientJSONModel("DashBoardList.json");
			this.getView().setModel(oDashModel,"oDashModel");
		},

		onListItemChange : function(evt)
		{
			this.getRouter().navTo("productcreate");
			
		},

		getContentDensityClass: function() {
			if (this._sContentDensityClass === undefined) {
				// check whether FLP has already set the content density class; do nothing in this case
				if (jQuery(document.body).hasClass("sapUiSizeCozy") || jQuery(document.body).hasClass("sapUiSizeCompact")) {
					this._sContentDensityClass = "";
				} else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}

	});

});
