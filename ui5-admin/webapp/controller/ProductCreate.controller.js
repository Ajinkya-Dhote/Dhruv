sap.ui.define([
	"sap/ui/Device",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
	"els/org/pratideen/controller/BaseController",
	"sap/m/MessageBox"
], function (Device, Controller, Filter, FilterOperator, JSONModel, BaseController, MessageBox) {
	"use strict";

	return BaseController.extend("els.org.pratideen.controller.ProductCreate", {

		onInit: function () {
			var that = this;
			this.getRouter().attachRouteMatched(this.onRouteMatched, this);
			this.getBaseProdList(function (callbackdata) {
				that.oBaseProdComboItems = callbackdata;
			});

			

		},


		onRouteMatched: function (oEvent) {
			var oParameters = oEvent.getParameters();
			if (oParameters.name !== "productdisp") {
				return;
			}
			this.getView().byId("productPanel").setVisible(false);
			this.getView().byId("quanConfPanel").setVisible(false);


		},

		onCreateNewBaseProd: function (oEvent) {
			debugger;
			var that = this;

			var sBaseProdName = that.getView().byId("baseProdCombo").getValue();
			if(!sBaseProdName)
			{
				sap.m.MessageToast.show("Empty Value !", that.oMsgToastProperties)
				return;
			}
			for (var each in that.oBaseProdComboItems) {
				if (that.oBaseProdComboItems[each].name === sBaseProdName) {
					sap.m.MessageToast.show("Base Product already present.", that.oMsgToastProperties);
					return;
				}
			}

			that.sBaseProdName = sBaseProdName;
			var oSendJSON = {
				"name": sBaseProdName.toString()
			};
			oSendJSON = JSON.stringify(oSendJSON);
			var headers = {
				// "X-Requested-With" : "XMLHttpRequest",
				"Content-Type": "application/json",
				//   "X-CSRF-Token" : "Fetch",
				//   "Accept" : "application/atom+xml;type=feed; charset=utf-8" 
				//"application/atom+xml,application/xml,application/atomsvc+xml" //"application/json",	//Content-Types that are acceptable for the response
			};
			$.ajax({
				// async: true, // Async by default is set to “true” load the script asynchronously  
				// URL to post data into sharepoint list  
				url: "/api/product/base-product",
				type: "POST", //Specifies the operation to create the list item 		
				headers: headers,
				data: oSendJSON,
				// dataType:"json",
				success: function (data, textStatus, respoonse) {
					debugger;
					that.getView().byId("productPanel").setVisible(true);

					that.getBaseProdList(function (callbackdata) {
						that.getView().byId("baseProdCombo").setValue(sBaseProdName);
						that.oBaseProdComboItems = that.getView().byId("baseProdCombo").getModel("oBaseProdList").getData().results;
						for (var each in that.oBaseProdComboItems) {
							if (sBaseProdName === that.oBaseProdComboItems[each].name) {
								that.BaseProductId = that.oBaseProdComboItems[each].id;
								that.getProdTypeList(that.BaseProductId);
								break;
							}
						}


					});
					// that.getView().byId("baseProdCombo").setValue(sBaseProdName);
					// that.BaseProductId = oEvent.getParameter("selectedItem").getProperty("key");
				},
				error: function (error) {
					sap.m.MessageToast.show("Something went wrong - " + JSON.stringify(error), that.oMsgToastProperties);
					that.getView().byId("productPanel").setVisible(false);
					that.BaseProductId = "";

				}

			});

		},

		onBaseProdSelChange: function (oEvent) {
			debugger;
			var oSelectedVal = oEvent.getParameter("newValue");
			this.getView().byId("quanConfPanel").setVisible(false);
			var flag = false;
			for (var each in oEvent.getSource().getItems()) {
				if (oSelectedVal === oEvent.getSource().getItems()[each].getProperty("text")) {
					flag = true;
					this.getView().byId("productPanel").setVisible(true);
					this.BaseProductId = parseInt(oEvent.getSource().getItems()[each].getProperty("key"));
					this.sBaseProdName = oSelectedVal;
					this.getProdTypeList(this.BaseProductId);
					break;
				}

			}
			if (!flag) {
				this.getView().byId("productPanel").setVisible(false);
			}


		},	

		// onCreateNewProdType: function (oEvent) {
		// 	debugger;
		// 	var that = this;
		// 	var sProdTypeName = this.getView().byId("inputProdtypeName").getValue();
		// 	var sProdTypeDet = this.getView().byId("inputProdtypeDet").getValue();

		// 	if(!sProdTypeName)
		// 	{
		// 		sap.m.MessageToast.show("Empty Value !")
		// 		return;
		// 	}

		// 	var oSendJSON = {
		// 		name: sProdTypeName,
		// 		description: sProdTypeDet,
		// 		dateFirstAvailable: that.getFormattedDate(),
		// 		available: true,
		// 		baseProductId: parseInt(that.BaseProductId)
		// 	};
		// 	oSendJSON = JSON.stringify(oSendJSON);
		// 	var headers = {
		// 		// "X-Requested-With" : "XMLHttpRequest",
		// 		"Content-Type": "application/json",
		// 		//   "X-CSRF-Token" : "Fetch",
		// 		//   "Accept" : "application/atom+xml;type=feed; charset=utf-8" 
		// 		//"application/atom+xml,application/xml,application/atomsvc+xml" //"application/json",	//Content-Types that are acceptable for the response
		// 	};
		// 	$.ajax({
		// 		// async: true, // Async by default is set to “true” load the script asynchronously  
		// 		// URL to post data into sharepoint list  
		// 		url: "/api/product/base-product",
		// 		type: "POST", //Specifies the operation to create the list item 		
		// 		headers: headers,
		// 		data: oSendJSON,
		// 		// dataType:"json",
		// 		success: function (data, textStatus, respoonse) {
		// 			debugger;
		// 			sap.m.MessageToast.show("Product Type Created for Base Product " + that.sBaseProdName);
		// 		},
		// 		error: function (error) {
		// 			sap.m.MessageToast.show("Something went wrong - " + JSON.stringify(error));
		// 			that.getView().byId("productPanel").setVisible(false);
		// 			that.BaseProductId = null;
		// 		}

		// 	});

		// },

		onAddProdType: function (oEvent) {
			debugger;
			var oTbl = this.getView().byId("prodTypeTable");
			var oTblMdl = oTbl.getModel("oProdTypebyBaseJSONMdl");
			var oTblJSON = oTblMdl.getProperty("/results");
			// var oItemsLen = oTblJSON.length;
			oTblJSON.push({
				name: "",
				description: "",
				baseProductId: "NEW"
			});
			oTblMdl.updateBindings(true);
			oEvent.getSource().setEnabled(false);

		},		

		onEditProdType: function (oEvent) {
			debugger;
			var that = this;
			var oTbl = this.getView().byId("prodTypeTable");
			var oSelectedItem = oTbl.getSelectedItem();
			if (!oSelectedItem) {
				sap.m.MessageToast.show("Kindly Select Product Type Record for Edit", that.oMsgToastProperties);
				return;
			}

			var sIndex = oSelectedItem.getBindingContextPath().split("/")[2];
			var oTblModel = oTbl.getModel("oProdTypebyBaseJSONMdl");
			var oTblModelResutls = oTblModel.getData().results;
			oTblModelResutls[sIndex].baseProductId = oTblModelResutls[sIndex].baseProductId + "NEW";
			var oTblModel = oTbl.getModel("oProdTypebyBaseJSONMdl");
			oTblModel.updateBindings(true);
			oEvent.getSource().setEnabled(false);
		},

		onDelProdType: function (oEvent) {
			debugger;
			var that = this;
			var oTbl = this.getView().byId("prodTypeTable");
			var oSelectedItem = oTbl.getSelectedItem();
			if (!oSelectedItem) {
				sap.m.MessageToast.show("Kindly Select Product Type Record for Delete" , that.oMsgToastProperties);
				return;
			}

			var sIndex = oSelectedItem.getBindingContextPath().split("/")[2];
			var oTblModel = oTbl.getModel("oProdTypebyBaseJSONMdl");
			var oTblModelResutls = oTblModel.getData().results;
			var sProdTypeIndex = oTblModelResutls[sIndex].id;

			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.warning(
				"Are you sure to delete this record ?", {
				actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				styleClass: bCompact ? "sapUiSizeCompact" : "",
				onClose: function (sAction) {
					if (sAction === "YES") {

						$.ajax({
							url: "/api/product/" + sProdTypeIndex,
							type: "DELETE", //Specifies the operation to create the list item 		
							// headers : headers,
							success: function (data, textStatus, respoonse) {
								debugger;
								that.getProdTypeList(that.BaseProductId);
								sap.m.MessageToast.show("Product Type deleted for Base Product - " + that.sBaseProdName
								, that.oMsgToastProperties);
							},
							error: function (error) {
								sap.m.MessageToast.show("Something went wrong - " + JSON.stringify(error)
								, that.oMsgToastProperties);
							}
						});



					}
				}
			}
			);




		},

		saveNewProdType: function (oEvent) {
			debugger;
			var that = this;
			var oTblRow = oEvent.getSource().getParent().getParent();
			var oTbl = oTblRow.getParent();
			oTbl.setSelectedItem(oTblRow);
			var sIndex = oTblRow.getBindingContextPath().split("/")[2];
			var oTblModel = oTbl.getModel("oProdTypebyBaseJSONMdl");
			var oTblModelResutls = oTblModel.getData().results;

			var sManipulatedItemId = oTblModelResutls[sIndex].baseProductId;

			var sRequestType = sManipulatedItemId.replace("NEW", "") === "" ? "POST" : "PUT";
			var sMsg = sManipulatedItemId.replace("NEW", "") === "" ? "created" : "updated";

			if(!oTblModelResutls[sIndex].name)
			{
				sap.m.MessageToast.show("Empty Value !", that.oMsgToastProperties)
				return;
			}

			var oSendJSON = {
				name: oTblModelResutls[sIndex].name,
				description: oTblModelResutls[sIndex].description,
				dateFirstAvailable: that.getFormattedDate(),
				available: true,
				baseProductId: parseInt(that.BaseProductId),
				image: ""
			};
			if (sRequestType === "PUT") {
				oSendJSON.id = oTblModelResutls[sIndex].id;
			}
			oSendJSON = JSON.stringify(oSendJSON);
			var headers = {
				"Content-Type": "application/json"
			};
			$.ajax({
				// async: true, // Async by default is set to “true” load the script asynchronously 
				url: "/api/product/",
				type: sRequestType, //Specifies the operation to create the list item 		
				headers: headers,
				data: oSendJSON,
				// dataType:"json",
				success: function (data, textStatus, respoonse) {
					debugger;
					that.getView().byId("addProdType").setEnabled(true);
					that.getView().byId("editProdType").setEnabled(true);
					that.getProdTypeList(that.BaseProductId);
					sap.m.MessageToast.show("Product Type " + sMsg + " for Base Product - " + that.sBaseProdName
					, that.oMsgToastProperties);
				},
				error: function (error) {
					sap.m.MessageToast.show("Something went wrong - " + JSON.stringify(error), that.oMsgToastProperties,);

				}
			});

		},

		onSelChgProdTypeTbl: function (oEvent) {
			debugger;
			var that=this;
			var oTblRow = oEvent.getParameter("listItem");
			var oTbl = oTblRow.getParent();
			// oTbl.setSelectedItem(oTblRow);
			var sIndex = oTblRow.getBindingContextPath().split("/")[2];
			var oTblModel = oTbl.getModel("oProdTypebyBaseJSONMdl");
			var oTblModelResutls = oTblModel.getData().results;
			var sProdTypeID = oTblModelResutls[sIndex].id;
			that.sProdTypeID = sProdTypeID;
			that.sProdTypeName = oTblModelResutls[sIndex].name;

			this.getProdPriceCategories(sProdTypeID);
			this.getView().byId("quanConfPanel").setVisible(true);
		},

		onAddQuantConfig: function (oEvent) {
			debugger;
			var that=this;
			var oTbl = this.getView().byId("quantConfigTable");
			var oTblMdl = oTbl.getModel("oCategorybyProdTypeJSONMdl");
			var oTblJSON = oTblMdl.getProperty("/results");
			// var oItemsLen = oTblJSON.length;
			oTblJSON.push({
				price: "",
				quantity: "1",
				unit:"KG",
				id: "NEW"
			});
			oTblMdl.updateBindings(true);
			oEvent.getSource().setEnabled(false);

		},		

		onEditQuantConfig: function (oEvent) {
			debugger;
			var that = this;
			var oTbl = this.getView().byId("quantConfigTable");
			var oSelectedItem = oTbl.getSelectedItem();
			if (!oSelectedItem) {
				sap.m.MessageToast.show("Kindly Select Quantity-Price Record for Edit", that.oMsgToastProperties);
				return;
			}

			var sIndex = oSelectedItem.getBindingContextPath().split("/")[2];
			var oTblModel = oTbl.getModel("oCategorybyProdTypeJSONMdl");
			var oTblModelResutls = oTblModel.getData().results;
			oTblModelResutls[sIndex].id = oTblModelResutls[sIndex].id + "NEW";
			var oTblModel = oTbl.getModel("oCategorybyProdTypeJSONMdl");
			oTblModel.updateBindings(true);
			oEvent.getSource().setEnabled(false);
		},

		onDelQuantConfig: function (oEvent) {
			debugger;
			var that = this;
			var oTbl = this.getView().byId("quantConfigTable");
			var oSelectedItem = oTbl.getSelectedItem();

			if (!oSelectedItem) {
				sap.m.MessageToast.show("Kindly Select Quantity-Price Record for Delete", that.oMsgToastProperties);
				return;
			}

			var sIndex = oSelectedItem.getBindingContextPath().split("/")[2];
			var oTblModel = oTbl.getModel("oCategorybyProdTypeJSONMdl");
			var oTblModelResutls = oTblModel.getData().results;
			var sQuantPriceIndex = oTblModelResutls[sIndex].id;
			

			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			MessageBox.warning(
				"Are you sure to delete this record ?", {
				actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
				styleClass: bCompact ? "sapUiSizeCompact" : "",
				onClose: function (sAction) {
					if (sAction === "YES") {

						$.ajax({
							url: "/api/product/category/" + sQuantPriceIndex,
							type: "DELETE", //Specifies the operation to create the list item 		
							// headers : headers,
							success: function (data, textStatus, respoonse) {
								debugger;
								that.getProdPriceCategories(that.sProdTypeID);
								sap.m.MessageToast.show("Quantity-Price deleted for Product Type - "
								 + that.sBaseProdName + " - "+ that.sProdTypeName, that.oMsgToastProperties);
							},
							error: function (error) {
								sap.m.MessageToast.show("Something went wrong - " + JSON.stringify(error), that.oMsgToastProperties);
							}
						});



					}
				}
			}
			);




		},

		saveNewQuantPrice: function (oEvent) {
			debugger;
			var that = this;
			var oTblRow = oEvent.getSource().getParent().getParent();
			var oTbl = oTblRow.getParent();
			oTbl.setSelectedItem(oTblRow);
			var sIndex = oTblRow.getBindingContextPath().split("/")[2];
			var oTblModel = oTbl.getModel("oCategorybyProdTypeJSONMdl");
			var oTblModelResutls = oTblModel.getData().results;

			var sManipulatedItemId = oTblModelResutls[sIndex].id;

			var sRequestType = sManipulatedItemId.replace("NEW", "") === "" ? "POST" : "PUT";
			var sMsg = sManipulatedItemId.replace("NEW", "") === "" ? "created" : "updated";

			if(!oTblModelResutls[sIndex].price || !oTblModelResutls[sIndex].quantity)
			{
				sap.m.MessageToast.show("Empty Value !", that.oMsgToastProperties)
				return;
			}

			var oSendJSON = {
				productId: that.sProdTypeID,
				unit: oTblModelResutls[sIndex].unit,
				quantity: oTblModelResutls[sIndex].quantity,
				price:  oTblModelResutls[sIndex].price				
			};
			if (sRequestType === "PUT") {
				oSendJSON.id = parseInt(sManipulatedItemId.replace("NEW", ""));
			}
			oSendJSON = JSON.stringify(oSendJSON);
			var headers = {
				"Content-Type": "application/json"
			};
			$.ajax({
				// async: true, // Async by default is set to “true” load the script asynchronously 
				url: "/api/product/category/",
				type: sRequestType, //Specifies the operation to create the list item 		
				headers: headers,
				data: oSendJSON,
				// dataType:"json",
				success: function (data, textStatus, respoonse) {
					debugger;
					that.getView().byId("addQuantConfig").setEnabled(true);
					that.getView().byId("editQuantConfig").setEnabled(true);
					that.getProdPriceCategories(that.sProdTypeID);
					sap.m.MessageToast.show("Quantity-Price " + sMsg + 
					" for Product - " + that.sBaseProdName + " - " + that.sProdTypeName , that.oMsgToastProperties);
				},
				error: function (error) {
					sap.m.MessageToast.show("Something went wrong - " + JSON.stringify(error) , that.oMsgToastProperties);

				}
			});
		}

	});

});
