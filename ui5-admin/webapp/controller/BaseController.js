sap.ui.define([	
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function(
	 Controller, 
	 JSONModel,
	 MessageBox
) {
	"use strict";

	return Controller.extend("els.org.pratideen.controller.BaseController", {

		onInit: function()
		{
			debugger;
			that.oMsgToastProperties = {
				duration: 5000,
				width: "50%",
				autoClose: true
			};
								
		},

		getBaseAPI_URI : function()
		{
			return "http://52.66.212.18:8084/api/";								
		},

		getBaseProdList : function(callbackfn)
		{
			var that = this;
			var oBaseProdList = new sap.ui.model.json.JSONModel();
			// var token =  $('input[name="csrfToken"]').attr('value')
			// $.ajaxSetup({
			// 	beforeSend: function(xhr) {
			// 		xhr.setRequestHeader('Csrf-Token', token);
			// 	}
			// });
            var aData = $.ajax({
                type : "GET",
                contentType : "application/json",
                url : "/api/product/base-product",               
                success : function(data,textStatus, jqXHR) {
					debugger;
					oBaseProdList.setData({results : data}); 
					that.getView().setModel(oBaseProdList,"oBaseProdList");
					if(callbackfn)
					callbackfn(data);
                    // sap.m.MessageToast.show("success to post");
				},
				failure : function(error) {
					debugger;
					sap.m.MessageToast.show("Error - "+ error, that.oMsgToastProperties);
				}

			});		

							
		},

		getProdTypeList : function(sBaseProdID, callbackfn)
		{
			var that = this;
			var oProdTypebyBaseJSONMdl = new sap.ui.model.json.JSONModel();
			
            var aData = $.ajax({
                type : "GET",
                contentType : "application/json",
                url : "/api/product/",
                // dataType : "json",
                success : function(data,textStatus, jqXHR) {
					debugger;
					var oProdTypebyBaseJSON = { results: [] };
					// sBaseProdID
					for( var each in data)
					{
						if( data[each].baseProduct.id.toString() === sBaseProdID.toString())
						{

							oProdTypebyBaseJSON.results.push(data[each]);
						}
					}
					oProdTypebyBaseJSONMdl.setData(oProdTypebyBaseJSON);
					that.getView().setModel(oProdTypebyBaseJSONMdl,"oProdTypebyBaseJSONMdl");
					that.getView().getModel("oProdTypebyBaseJSONMdl").updateBindings(true);
					
					if(callbackfn)
					callbackfn(data);
                    
				},
				failure : function(error) {
					debugger;
					sap.m.MessageToast.show("Error - "+ error , that.oMsgToastProperties);
				}

			});		

							
		},

		getProdPriceCategories : function(sProdTypeID, callbackfn)
		{
			var that = this;
			var oCategorybyProdTypeJSONMdl = new sap.ui.model.json.JSONModel();
			
            var aData = $.ajax({
                type : "GET",
                contentType : "application/json",
                url : "/api/product/category/"+sProdTypeID,               
                success : function(data,textStatus, jqXHR) {
					debugger;
					var oCategorybyProdTypeJSON = { results: data };					
				
					oCategorybyProdTypeJSONMdl.setData(oCategorybyProdTypeJSON);
					that.getView().setModel(oCategorybyProdTypeJSONMdl,"oCategorybyProdTypeJSONMdl");
					that.getView().getModel("oCategorybyProdTypeJSONMdl").updateBindings(true);
					
					if(callbackfn)
					callbackfn(data);
                    
				},
				failure : function(error) {
					debugger;
					sap.m.MessageToast.show("Error - "+ error , that.oMsgToastProperties);
				}

			});		

							
		},

		getFormattedDate : function(oReceivedDate){ // 20 Apr 2020
			var oDate;
			if(oReceivedDate)
			 oDate = new Date(oReceivedDate);
			 else
			 oDate = new Date();

			 var sDate = oDate.getDate();
			 sDate =  sDate < 10 ? "0"+ oDate : sDate;

			 var sMonth = oDate.getMonth()+1;
			 sMonth =  sMonth < 10 ? "0"+ sMonth : sMonth;
			var sFormattedDate = oDate.getFullYear()+"-"+sMonth+"-"+sDate + "T00:00:00.000Z";
			return sFormattedDate;
		}, 

		getClientJSONModel :  function (sJSONName) {

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