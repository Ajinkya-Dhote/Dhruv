/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/XMLComposite","./library","sap/ui/core/Item"],function(X,l,I){"use strict";var M=X.extend("sap.m.MultiEditField",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{selectedItem:{type:"sap.ui.core.Item",group:"Data",defaultValue:null,invalidate:true},showValueHelp:{type:"boolean",group:"Behavior",defaultValue:true,invalidate:true},nullable:{type:"boolean",group:"Behavior",defaultValue:true,invalidate:true},required:{type:"boolean",group:"Behavior",defaultValue:false,invalidate:true}},aggregations:{items:{type:"sap.ui.core.Item",multiple:true,bindable:"bindable"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}}}}});M.prototype.init=function(){if(!M.prototype._oRb){M.prototype._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");}var k=new I({key:"keep",text:"< "+this._oRb.getText("MULTI_EDIT_KEEP_TEXT")+" >"}),b=new I({key:"blank",text:"< "+this._oRb.getText("MULTI_EDIT_BLANK_TEXT")+" >"}),n=new I({key:"new",text:"< "+this._oRb.getText("MULTI_EDIT_NEW_TEXT")+" >"});this._getKeepAll=function(){return k;};this._getBlank=function(){return b;};this._getValueHelp=function(){return n;};this.byId("select").getParent=this.getParent.bind(this);this._oLastSelectedItem=this._getKeepAll();};M.prototype.onBeforeRendering=function(){this.insertAggregation("items",this._getKeepAll(),0,true);if(this.getNullable()){this.insertAggregation("items",this._getBlank(),1,true);}else{this.removeAggregation("items",this._getBlank(),true);}if(this.getShowValueHelp()){this.insertAggregation("items",this._getValueHelp(),this.getNullable()?2:1,true);}else{this.removeAggregation("items",this._getValueHelp(),true);}var s=this.getSelectedItem();if(s){s=this._getInternalItem(s);this.byId("select").setSelectedItem(s);}};M.prototype.setSelectedItem=function(s){var i=this._getExternalItem(s)||s;var o;if(i&&this.indexOfItem(i)>=0&&!this._isSpecialValueItem(i)){o=this._getInternalItem(s);if(o){this.byId("select").setSelectedItem(o);}this._oLastSelectedItem=i;return this.setProperty("selectedItem",i);}return this;};M.prototype.exit=function(){this._getKeepAll().destroy();this._getBlank().destroy();this._getValueHelp().destroy();var i=this.byId("itemTemplate");if(i){i.destroy();}};M.prototype.getFormDoNotAdjustWidth=function(){return true;};M.prototype.isBlankSelected=function(){return this._getExternalItem(this.byId("select").getSelectedItem())===this._getBlank();};M.prototype.isKeepExistingSelected=function(){return this._getExternalItem(this.byId("select").getSelectedItem())===this._getKeepAll();};M.prototype._isSpecialValueItem=function(i){return i===this._getKeepAll()||i===this._getBlank()||i===this._getValueHelp();};M.prototype._handleSelectionChange=function(e){var i=this._getExternalItem(e.getParameter("selectedItem"));if(i&&!this._isSpecialValueItem(i)){this.fireChange({selectedItem:i});}else if(i===this._getValueHelp()){this.fireEvent("_valueHelpRequest");}if(i!==this._getValueHelp()){this._oLastSelectedItem=i;this.setProperty("selectedItem",i,true);}};M.prototype.resetSelection=function(){this.byId("select").setSelectedItem(this._getInternalItem(this._oLastSelectedItem));};M.prototype._getExternalItem=function(i){var a=this.byId("select").indexOfItem(i);if(a>=0){return this.getItems()[a];}return null;};M.prototype._getInternalItem=function(i){var a=this.indexOfItem(i);if(a>=0){return this.byId("select").getItems()[a];}return null;};M.prototype._getInternalDomRef=function(){var s=this.byId("select");return s&&s.getDomRef();};M.prototype._getInternalUIArea=function(){return this.byId("select").getUIArea();};return M;});
