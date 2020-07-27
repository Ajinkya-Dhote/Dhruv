sap.ui.define([
	"sap/ui/Device",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
	"els/org/pratideen/controller/BaseController"
], function(Device, Controller, Filter, FilterOperator, JSONModel, BaseController) {
	"use strict";

	return BaseController.extend("els.org.pratideen.controller.ProductDisp", {

		onInit: function() {

			this.getRouter().attachRouteMatched(this.onRouteMatched, this);

		},

		
		onRouteMatched: function(oEvent) {
			var oParameters = oEvent.getParameters();
			if (oParameters.name !== "productdisp") {
				return;
			}

				
			var oProdModel = new sap.ui.model.json.JSONModel();
			// var token =  $('input[name="csrfToken"]').attr('value')
			// $.ajaxSetup({
			// 	beforeSend: function(xhr) {
			// 		xhr.setRequestHeader('Csrf-Token', token);
			// 	}
			// });
            var aData = jQuery.ajax({
                type : "GET",
                contentType : "application/xhtml+xml",
                url : "/proxy/api/product/base-product",
                // dataType : "json",
                success : function(data,textStatus, jqXHR) {
					debugger;
                    oProdModel.setData({modelData : data}); 
                    alert("success to post");
				},
				failure : function(error) {
					debugger;
					alert("error to post");
				}

            });
			
		},

		onCreatePress : function(evt)
		{
			this.getRouter().navTo("productcreate");
			
		},
	
	});

});
