sap.ui.define([	
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(
	 Controller, 
	 JSONModel
) {
	"use strict";

	return Controller.extend("els.org.pratideen.controller.BaseController", {

		onInit: function()
		{
			debugger;
								
		},

		getBaseAPI_URI : function()
		{
			return "http://52.66.212.18:8084/api/";								
		},

		getJSONModel :  function (sJSONName) {

			var oJSON;
			switch(sJSONName)
			{
				case "DashBoardList.json":
					oJSON = new JSONModel("./util/DashBoardList.json");
					break;
				 
					default:
						oJSON : {}	
			}

			return oJSON;
		},

		navBack: function () {
			this.getRouter().navTo("app");
		},

		getRouter : function () {
			return this.getOwnerComponent().getRouter();
		},

		getModel : function (sName) {
			return this.getView().getModel(sName);
		},
		
		setModel : function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},
	
		getResourceBundle : function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},



	});
});