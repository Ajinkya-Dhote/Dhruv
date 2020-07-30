/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./TextField','./TextView','./library','sap/ui/core/Control','sap/ui/core/ValueStateSupport','sap/ui/core/theming/Parameters',"./InPlaceEditRenderer"],function(q,T,a,l,C,V,P,I){"use strict";var b=C.extend("sap.ui.commons.InPlaceEdit",{metadata:{library:"sap.ui.commons",properties:{valueState:{type:"sap.ui.core.ValueState",group:"Data",defaultValue:sap.ui.core.ValueState.None},undoEnabled:{type:"boolean",group:"Misc",defaultValue:true},design:{type:"sap.ui.commons.TextViewDesign",group:"Data",defaultValue:sap.ui.commons.TextViewDesign.Standard}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:false}},events:{change:{parameters:{newValue:{type:"string"}}},liveChange:{parameters:{liveValue:{type:"string"}}}}}});(function(){b.prototype.init=function(){this._bEditMode=false;};b.prototype.exit=function(){this._bEditMode=undefined;this._oDisplayControl=undefined;this._oEditControl=undefined;this._sOldText=undefined;this._sOldTextAvailable=undefined;this._bUseEditButton=undefined;this._iHeight=undefined;if(this._oTextView){this._oTextView.destroy();delete this._oTextView;}if(this._oTextField){this._oTextField.destroy();delete this._oTextField;}if(this._oUndoButton){this._oUndoButton.destroy();delete this._oUndoButton;}if(this._oEditButton){this._oEditButton.destroy();delete this._oEditButton;}var t=this.getContent();if(t){t.detachEvent("_change",r,this);if(t instanceof T){t.detachEvent("change",o,this);t.detachEvent("liveChange",p,this);}}};b.prototype.onBeforeRendering=function(){var t=this;u(t);e(t);var v=this.getTooltip();if(v instanceof sap.ui.core.TooltipBase){if(this._bEditMode){v._currentControl=this._oEditControl;}else{v._currentControl=this._oDisplayControl;}}};b.prototype.onAfterRendering=function(){if(!this._bEditMode&&this.getEditable()&&this._oTextView&&this._oTextView.getDomRef()){this._oTextView.$().attr("tabindex","0");}var $=this.$();var t;var O;if(this._bEditMode){this._oEditControl.$().css("width","100%");if(this._iHeight>0){O=$.height();var D=this._iHeight-O;var M=$.outerHeight(true)-$.outerHeight(false);D=D+M;var v=Math.floor(D/2);var w=D-v;$.css("margin-top",v+"px").css("margin-bottom",w+"px");}}else if(this._oDisplayControl.getMetadata().getName()=="sap.ui.commons.Link"){this._oDisplayControl.$().css("width","auto").css("max-width","100%");}else{var x=this._oDisplayControl.$();x.css("width","100%");if(!this._iHeight&&this._iHeight!=0&&this.getDesign()!=sap.ui.commons.TextViewDesign.Standard){t=x.outerHeight(true);O=$.innerHeight();if(O<t){var y=$.outerHeight()-$.innerHeight();this._iHeight=t+y;}else{this._iHeight=0;}}if(this._iHeight>0){$.css("height",this._iHeight+"px");}}if(this._sOldTextAvailable&&this._oUndoButton&&this._oUndoButton.getDomRef()){this._oUndoButton.$().attr("tabindex","-1");}if(this._oEditButton&&this._oEditButton.getDomRef()){this._oEditButton.$().attr("tabindex","-1");}if(this._delayedCallId){q.sap.clearDelayedCall(this._delayedCallId);this._delayedCallId=null;}if(this.getValueState()==sap.ui.core.ValueState.Success){this._delayedCallId=q.sap.delayedCall(3000,this,"removeValidVisualization");}};b.prototype.removeValidVisualization=function(){var D=this.$();if(D){D.removeClass("sapUiIpeSucc");}};b.prototype.clearOldText=function(){if(!this.getUndoEnabled()){return;}if(this._bEditMode){this._sOldText=this._oEditControl.getValue();this._sOldTextAvailable=true;}else{this._sOldText=undefined;this._sOldTextAvailable=false;}this.rerender();};b.prototype.getRequired=function(){if(this.getContent()&&this.getContent().getRequired){return this.getContent().getRequired();}else{return false;}};b.prototype.getEditable=function(){var t=this.getContent();if(!t||(t.getEditable&&!t.getEditable())||(t.getEnabled&&!t.getEnabled())){return false;}else{return true;}};b.prototype.onsapescape=function(E){if(this.getUndoEnabled()){if(!sap.ui.Device.browser.firefox){var t=this;f(t);}else{this._bEsc=true;}if(this.$().hasClass("sapUiIpeUndo")){E.stopPropagation();}this._oEditControl._bEsc=undefined;this._oEditControl._sValue=undefined;}};b.prototype.onkeypress=function(E){if(this._bEsc){var t=this;this._bEsc=undefined;f(t);}};b.prototype.onkeydown=function(E){if(E.keyCode==q.sap.KeyCodes.F2&&!this._bEditMode){var t=this;s(t);this.$().addClass("sapUiIpeFocus");}};b.prototype.onfocusin=function(E){if(!this._bEditMode){if(!this._bUseEditButton&&E.target.id!=this.getId()+"--X"){var t=this;s(t);}this.$().addClass("sapUiIpeFocus");}else if(this._focusDelay){q.sap.clearDelayedCall(this._focusDelay);this._focusDelay=null;}};b.prototype.ontap=function(E){if(sap.ui.Device.os.name=="iOS"){this.onfocusin(E);}};b.prototype.onfocusout=function(E){if(this._focusDelay){q.sap.clearDelayedCall(this._focusDelay);this._focusDelay=null;}this._focusDelay=q.sap.delayedCall(200,this,"_handleFocusOut",arguments);};b.prototype._handleFocusOut=function(E){var F=document.activeElement;if(!q.sap.containsOrEquals(this.getDomRef(),F)){if(!this._bEditMode){this.$().removeClass("sapUiIpeFocus");}var t=this;d(t);}this._focusDelay=undefined;};b.prototype.setContent=function(t){var O=this.getContent();if(O){O.detachEvent("_change",r,this);if(O instanceof T){O.detachEvent("change",o,this);O.detachEvent("liveChange",p,this);O._propagateEsc=undefined;}}this._sOldText=undefined;this._sOldTextAvailable=false;this._oDisplayControl=undefined;this._oEditControl=undefined;this.setAggregation("content",t);if(t){t.attachEvent("_change",r,this);if(t instanceof T){t.attachEvent("change",o,this);t.attachEvent("liveChange",p,this);t._propagateEsc=true;}}var v=this;u(v);};b.prototype.setValueState=function(v){var t=this.getContent();if(t&&t.setValueState){t.setValueState(v);}else if(this._oEditControl&&this._oEditControl.setValueState){this._oEditControl.setValueState(v);r.call(this);}else{this.setProperty("valueState",v);}return this;};b.prototype.getValueState=function(){var t=this.getContent();if(t&&t.getValueState){return t.getValueState();}else if(this._oEditControl&&this._oEditControl.getValueState){return this._oEditControl.getValueState();}else{return this.getProperty("valueState");}};b.prototype.setTooltip=function(t){var v=this.getContent();if(v){v.setTooltip(t);}else{this._refreshTooltipBaseDelegate(t);this.setAggregation("tooltip",t);}return this;};b.prototype.getTooltip=function(){var t=this.getContent();if(t){return t.getTooltip();}else{return this.getAggregation("tooltip");}};b.prototype.setDesign=function(D){this.setProperty("design",D);this._iHeight=undefined;return this;};b.prototype.clone=function(){var t=this.getContent();if(t){t.detachEvent("_change",r,this);if(t instanceof T){t.detachEvent("change",o,this);t.detachEvent("liveChange",p,this);}}var v=C.prototype.clone.apply(this,arguments);if(t){t.attachEvent("_change",r,this);if(t instanceof T){t.attachEvent("change",o,this);t.attachEvent("liveChange",p,this);}}return v;};b.prototype.getFocusDomRef=function(){if(!this.getDomRef()){return undefined;}if(this._bEditMode){return this._oEditControl.getFocusDomRef();}else{return this._oDisplayControl.getFocusDomRef();}};b.prototype.getIdForLabel=function(){if(this._oDisplayControl&&this._oDisplayControl.getMetadata().getName()=="sap.ui.commons.Link"){return this._oDisplayControl.getId();}else if(this._oEditControl){return this._oEditControl.getId();}else{return this.getId();}};b.prototype.onThemeChanged=function(E){var t=this;i(t);k(t);this._iHeight=undefined;if(this.getDomRef()&&!this._bEditMode){this.rerender();}};b.prototype.getAccessibilityInfo=function(){var t=this.getContent();return t&&t.getAccessibilityInfo?t.getAccessibilityInfo():null;};var c={onAfterRendering:function(){this.onAfterRendering();}};function u(t){var v=t.getContent();if(!v){return;}var w=v.getTooltip();switch(v.getMetadata().getName()){case"sap.ui.commons.TextField":case"sap.ui.commons.ComboBox":case"sap.ui.commons.DropdownBox":if(!t._oTextView){t._oTextView=new a(t.getId()+"--TV",{wrapping:false});t._oTextView.setParent(t);t._oTextView.removeDelegate(c);t._oTextView.addDelegate(c,t);t._oTextView.getTooltip=function(){return this.getParent().getTooltip();};}t._oTextView.setText(v.getValue());t._oTextView.setEnabled(v.getEnabled());t._oTextView.setTextDirection(v.getTextDirection());t._oTextView.setVisible(v.getVisible());t._oTextView.setWidth("100%");t._oTextView.setTextAlign(v.getTextAlign());t._oTextView.setDesign(t.getDesign());t._oTextView.setHelpId(v.getHelpId());t._oTextView.setAccessibleRole(v.getAccessibleRole());if(t._oTextView._oTooltip&&t._oTextView._oTooltip!=w){t._oTextView.removeDelegate(t._oTextView._oTooltip);t._oTextView._oTooltip=undefined;}if(w instanceof sap.ui.core.TooltipBase){if(!t._oTextView._oTooltip||t._oTextView._oTooltip!=w){t._oTextView.addDelegate(w);t._oTextView._oTooltip=w;}}t._oDisplayControl=t._oTextView;t._oEditControl=v;t._bUseEditButton=false;break;case"sap.ui.commons.Link":t._oDisplayControl=v;t._oDisplayControl.removeDelegate(c);t._oDisplayControl.addDelegate(c,t);if(t._oTextField){t._oTextField.setValue(v.getText());t._oTextField.setWidth("100%");t._oEditControl=t._oTextField;if(t._oTextField._oTooltip&&t._oTextField._oTooltip!=w){t._oTextField.removeDelegate(t._oTextField._oTooltip);t._oTextField._oTooltip=undefined;}if(w instanceof sap.ui.core.TooltipBase){if(!t._oTextField._oTooltip||t._oTextField._oTooltip!=w){t._oTextField.addDelegate(w);t._oTextField._oTooltip=w;}}}j(t);t._bUseEditButton=true;break;default:throw new Error("Control not supported for InPlaceEdit");}}function s(t){if(!t._bEditMode&&t.getEditable()){if(!t._oEditControl&&t.getContent().getMetadata().getName()=="sap.ui.commons.Link"){var v=t.getValueState();t._oTextField=new T(t.getId()+"--input",{valueState:v});t._oTextField.setParent(t);t._oTextField.attachEvent('change',n,t);t._oTextField.attachEvent('liveChange',p,t);t._oTextField._propagateEsc=true;t._oTextField.getTooltip=function(){return this.getParent().getTooltip();};}if(!t._sOldTextAvailable&&t.getUndoEnabled()){t._sOldText=g(t);t._sOldTextAvailable=true;}t._bEditMode=true;t.rerender();t._oEditControl.focus();}}function d(t){if(t._bEditMode&&t.getEditable()){t._bEditMode=false;if(t._sOldText==g(t)){t._sOldText=undefined;t._sOldTextAvailable=false;}t.rerender();}}function g(t){var v=t.getContent();if(!v){return undefined;}if(v.getValue){return v.getValue();}else if(v.getText){return v.getText();}}function e(t){if(!t._oUndoButton&&t.getUndoEnabled()){t._oUndoButton=new sap.ui.commons.Button(t.getId()+"--X",{lite:true}).setParent(t);i(t);t._oUndoButton.attachEvent('press',h,t);}if(t._oUndoButton){t._oUndoButton.setEnabled(t.getEditable());}}function i(t){if(t._oUndoButton){var v=P._getThemeImage('_sap_ui_commons_InPlaceEdit_UndoImageURL');var w=P._getThemeImage('_sap_ui_commons_InPlaceEdit_UndoImageDownURL');if(!v){v="sap-icon://decline";}t._oUndoButton.setIcon(v);t._oUndoButton.setIconHovered(w);}}function h(E){var t=this;f(t);if(this._bEditMode){this._oEditControl.focus();this.$().removeClass("sapUiIpeUndo");}}function f(t){if(t.getUndoEnabled()&&t._sOldTextAvailable){var v=t.getContent();if(!v){return;}if(v.setValue){v.setValue(t._sOldText);}else if(v.setText){v.setText(t._sOldText);}if(t._bEditMode){t._oEditControl.setValue(t._sOldText);t._oEditControl.fireChange({newValue:t._sOldText});}else if(v.fireChange){v.fireChange({newValue:t._sOldText});}else{t.fireChange({newValue:t._sOldText});}if(!t._bEditMode){t._sOldText=undefined;t._sOldTextAvailable=false;}}}function j(t){if(!t._oEditButton){t._oEditButton=new sap.ui.commons.Button(t.getId()+"--Edit",{lite:true}).setParent(t);t._oEditButton.addStyleClass("sapUiIpeEBtn");k(t);t._oEditButton.attachEvent('press',m,t);}}function k(t){if(t._oEditButton){var v=P._getThemeImage('_sap_ui_commons_InPlaceEdit_EditImageURL');var w=P._getThemeImage('_sap_ui_commons_InPlaceEdit_EditImageDownURL');if(!v){v="sap-icon://edit";}t._oEditButton.setIcon(v);t._oEditButton.setIconHovered(w);}}function m(E){var t=this;s(t);this.$().addClass("sapUiIpeFocus");}function n(E){var t=this.getContent();if(t.setText){var N=E.getParameter("newValue");t.setText(N);o.apply(this,arguments);}}function o(E){if(this._sOldText!=E.getParameter("newValue")&&this.getUndoEnabled()){this.$().addClass("sapUiIpeUndo");}else{this.$().removeClass("sapUiIpeUndo");}this.fireChange(E.getParameters());}function p(E){if(this._sOldText!=E.getParameter("liveValue")&&this.getUndoEnabled()){this.$().addClass("sapUiIpeUndo");}else{this.$().removeClass("sapUiIpeUndo");}this.fireLiveChange({liveValue:E.getParameter("liveValue")});}function r(){if(!this._bEditMode){this.invalidate();}else{switch(this.getValueState()){case(sap.ui.core.ValueState.Error):if(!this.$().hasClass('sapUiIpeErr')){this.$().addClass('sapUiIpeErr');this.$().removeClass('sapUiIpeWarn');this.$().removeClass('sapUiIpeSucc');}break;case(sap.ui.core.ValueState.Success):if(!this.$().hasClass('sapUiIpeSucc')){this.$().addClass('sapUiIpeSucc');this.$().removeClass('sapUiIpeErr');this.$().removeClass('sapUiIpeWarn');}break;case(sap.ui.core.ValueState.Warning):if(!this.$().hasClass('sapUiIpeWarn')){this.$().addClass('sapUiIpeWarn');this.$().removeClass('sapUiIpeErr');this.$().removeClass('sapUiIpeSucc');}break;default:this.$().removeClass('sapUiIpeWarn');this.$().removeClass('sapUiIpeErr');this.$().removeClass('sapUiIpeSucc');break;}}}}());return b;},true);