/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Control','sap/ui/Device'],function(C,D){"use strict";var P=C.extend("sap.ui.documentation.sdk.controls.ParamText",{metadata:{properties:{text:{type:"string",defaultValue:""},phoneText:{type:"string",defaultValue:""},depth:{type:"int",defaultValue:0},optional:{type:"boolean",defaultValue:false},defaultFlag:{type:"boolean",defaultValue:false},deprecated:{type:"boolean",defaultValue:false},experimental:{type:"boolean",defaultValue:false},href:{type:"sap.ui.core.URI"}},events:{press:{}}},_getText:function(){var p=this.getPhoneText();return D.system.phone&&p?p:this.getText();},renderer:function(r,c){var h=c.getHref();if(h){r.write("<a");r.writeAttributeEscaped("href",h);r.addClass("sapMLnk");}else{r.write("<div");}r.addClass("depth-"+c.getDepth());r.writeControlData(c);r.addClass("sapUiParamText");r.writeClasses();r.write(">");r.writeEscaped(c._getText());if(c.getOptional()){r.write("?");}if(c.getDefaultFlag()){r.write("<span");r.addClass("parameterDefault");r.writeClasses();r.write(">");r.write("(default)");r.write("</span>");}if(h){r.write("</a>");r.write("<div");r.addClass("sapUiParamText");r.writeClasses();r.write(">");}if(c.getDeprecated()){r.write("<div");r.addClass("deprecated");r.writeClasses();r.write(">");r.writeIcon('sap-icon://message-error');r.write("<span");r.addClass("deprecatedText");r.writeClasses();r.write(">");r.write("Deprecated");r.write("</span>");r.write("</div>");}if(c.getExperimental()){r.write("<div");r.addClass("experimental");r.writeClasses();r.write(">");r.writeIcon('sap-icon://message-warning');r.write("<span");r.addClass("experimentalText");r.writeClasses();r.write(">");r.write("Experimental");r.write("</span>");r.write("</div>");}r.write("</div>");}});P.prototype._handlePress=function(e){this.firePress({});};if(D.support.touch){P.prototype.ontap=P.prototype._handlePress;}else{P.prototype.onclick=P.prototype._handlePress;}return P;});
