/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ComboBox','./ComboBoxRenderer','./ListBox','./TextField','./TextFieldRenderer','./library','sap/ui/core/Control','sap/ui/core/History','sap/ui/core/Renderer',"./SearchFieldRenderer",'jquery.sap.dom'],function(q,C,a,L,T,b,l,c,H,R,S){"use strict";var d=c.extend("sap.ui.commons.SearchField",{metadata:{interfaces:["sap.ui.commons.ToolbarItem"],library:"sap.ui.commons",properties:{enableListSuggest:{type:"boolean",group:"Behavior",defaultValue:true},showListExpander:{type:"boolean",group:"Behavior",defaultValue:true},enableClear:{type:"boolean",group:"Behavior",defaultValue:false},showExternalButton:{type:"boolean",group:"Behavior",defaultValue:false},enableCache:{type:"boolean",group:"Behavior",defaultValue:true},enableFilterMode:{type:"boolean",group:"Behavior",defaultValue:false},value:{type:"string",group:"Data",defaultValue:''},enabled:{type:"boolean",group:"Behavior",defaultValue:true},editable:{type:"boolean",group:"Behavior",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},maxLength:{type:"int",group:"Behavior",defaultValue:0},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:sap.ui.core.ValueState.None},placeholder:{type:"string",group:"Appearance",defaultValue:""},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:sap.ui.core.TextAlign.Begin},visibleItemCount:{type:"int",group:"Behavior",defaultValue:20},startSuggestion:{type:"int",group:"Behavior",defaultValue:3},maxSuggestionItems:{type:"int",group:"Behavior",defaultValue:10},maxHistoryItems:{type:"int",group:"Behavior",defaultValue:0}},aggregations:{searchProvider:{type:"sap.ui.core.search.SearchProvider",multiple:false}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{search:{parameters:{query:{type:"string"}}},suggest:{parameters:{value:{type:"string"}}}}}});(function(){var _=20;d.prototype.init=function(){h(this,this.getEnableListSuggest());this._oHistory=new H(this.getId());this._clearTooltipText=j("SEARCHFIELD_CLEAR_TOOLTIP");};d.prototype.exit=function(){if(this._ctrl){this._ctrl.destroy();}if(this._lb){this._lb.destroy();}if(this._btn){this._btn.destroy();}this._ctrl=null;this._lb=null;this._btn=null;this._oHistory=null;};d.prototype.onThemeChanged=function(E){if(this.getDomRef()){this.invalidate();}};d.prototype.onAfterRendering=function(){if(this.getShowExternalButton()){var B=this._btn.$().outerWidth(true);this._ctrl.$().css(sap.ui.getCore().getConfiguration().getRTL()?"left":"right",B+"px");}e(this);};d.prototype.getFocusDomRef=function(){return this._ctrl.getFocusDomRef();};d.prototype.getIdForLabel=function(){return this._ctrl.getId()+'-input';};d.prototype.onpaste=function(E){var t=this;setTimeout(function(){t._ctrl._triggerValueHelp=true;t._ctrl.onkeyup();},0);};d.prototype.oncut=d.prototype.onpaste;d.prototype.fireSearch=function(A){var v=q(this._ctrl.getInputDomRef()).val();if(!this.getEditable()||!this.getEnabled()){return this;}this.setValue(v);if(!v&&!this.getEnableFilterMode()){return this;}if(!A){A={};}if(!A.noFocus){v=this.getValue();this.focus();if(v&&(this.getMaxHistoryItems()>0)){this._oHistory.add(v);}this.fireEvent("search",{query:v});}return this;};d.prototype.hasListExpander=function(){return k()?false:this.getShowListExpander();};d.prototype.clearHistory=function(){this._oHistory.clear();};d.prototype.suggest=function(s,i){if(!this.getEnableListSuggest()||!s||!i){return;}this._ctrl.updateSuggestions(s,i);};d.prototype.setEnableListSuggest=function(E){if((this.getEnableListSuggest()&&E)||(!this.getEnableListSuggest()&&!E)){return this;}h(this,E);this.setProperty("enableListSuggest",E);return this;};d.prototype.getValue=function(){return g(this,"Value");};d.prototype.setValue=function(v){var r=f(this,"Value",v,!!this.getDomRef(),true);if(this.getEnableClear()&&this.getDomRef()){this.$().toggleClass("sapUiSearchFieldVal",!!v);e(this);}return r;};d.prototype.setEnableCache=function(E){return this.setProperty("enableCache",E,true);};d.prototype.getEnabled=function(){return g(this,"Enabled");};d.prototype.setEnabled=function(E){if(this._btn){this._btn.setEnabled(E&&this.getEditable());}return f(this,"Enabled",E,false,true);};d.prototype.getEditable=function(){return g(this,"Editable");};d.prototype.setEditable=function(E){if(this._btn){this._btn.setEnabled(E&&this.getEnabled());}return f(this,"Editable",E,false,true);};d.prototype.getMaxLength=function(){return g(this,"MaxLength");};d.prototype.setMaxLength=function(M){return f(this,"MaxLength",M,false,true);};d.prototype.getValueState=function(){return g(this,"ValueState");};d.prototype.setValueState=function(v){return f(this,"ValueState",v,false,true);};d.prototype.getPlaceholder=function(){return g(this,"Placeholder");};d.prototype.setPlaceholder=function(t){return f(this,"Placeholder",t,false,true);};d.prototype.getTextAlign=function(){return g(this,"TextAlign");};d.prototype.setTextAlign=function(t){return f(this,"TextAlign",t,false,true);};d.prototype.getTooltip=function(){return g(this,"Tooltip");};d.prototype.setTooltip=function(t){return f(this,"Tooltip",t,true,false);};d.prototype.getVisibleItemCount=function(){return g(this,"MaxPopupItems");};d.prototype.setVisibleItemCount=function(v){return f(this,"MaxPopupItems",v,false,true);};d.prototype.setShowExternalButton=function(s){if(!this._btn){q.sap.require("sap.ui.commons.Button");var t=this;this._btn=new sap.ui.commons.Button(this.getId()+"-btn",{text:j("SEARCHFIELD_BUTTONTEXT"),enabled:this.getEditable()&&this.getEnabled(),press:function(){t.fireSearch();}});this._btn.setParent(this);}this.setProperty("showExternalButton",s);return this;};d.prototype.getAriaDescribedBy=function(){return this._ctrl.getAriaDescribedBy();};d.prototype.getAriaLabelledBy=function(){return this._ctrl.getAriaLabelledBy();};d.prototype.removeAllAriaDescribedBy=function(){return this._ctrl.removeAllAriaDescribedBy();};d.prototype.removeAllAriaLabelledBy=function(){return this._ctrl.removeAllAriaLabelledBy();};d.prototype.removeAriaDescribedBy=function(v){return this._ctrl.removeAriaDescribedBy(v);};d.prototype.removeAriaLabelledBy=function(v){return this._ctrl.removeAriaLabelledBy(v);};d.prototype.addAriaDescribedBy=function(v){this._ctrl.addAriaDescribedBy(v);return this;};d.prototype.addAriaLabelledBy=function(v){this._ctrl.addAriaLabelledBy(v);return this;};var e=function(t){var $=t.$(),i=t._ctrl.$("searchico");if($.hasClass("sapUiSearchFieldClear")&&$.hasClass("sapUiSearchFieldVal")){i.attr("title",t._clearTooltipText);}else{i.removeAttr("title");}};var f=function(t,M,v,s,u){var o=g(t,M);t._ctrl["set"+M](v);if(!s){t.invalidate();}if(u){t.updateModelProperty(M.toLowerCase(),v,o);}return t;};var g=function(t,G){return t._ctrl["get"+G]();};var h=function(t,E){if(!t._lb){t._lb=new L(t.getId()+"-lb");}var o=t._ctrl;var n=null;if(E){n=new d.CB(t.getId()+"-cb",{listBox:t._lb,maxPopupItems:_});n.addDependent(t._lb);}else{n=new d.TF(t.getId()+"-tf");}n.setParent(t);n.addEventDelegate({onAfterRendering:function(){e(t);var F=q(n.getFocusDomRef());var s=F.attr("aria-labelledby")||"";if(s){s=" "+s;}F.attr("aria-labelledby",t.getId()+"-label"+s);}});if(o){n.setValue(o.getValue());n.setEnabled(o.getEnabled());n.setEditable(o.getEditable());n.setMaxLength(o.getMaxLength());n.setValueState(o.getValueState());n.setPlaceholder(o.getPlaceholder());n.setTextAlign(o.getTextAlign());n.setTooltip(o.getTooltip());n.setMaxPopupItems(o.getMaxPopupItems());var A=o.getAriaDescribedBy();for(var i=0;i<A.length;i++){n.addAriaDescribedBy(A[i]);}o.removeAllAriaDescribedBy();A=o.getAriaLabelledBy();for(var i=0;i<A.length;i++){n.addAriaLabelledBy(A[i]);}o.removeAllAriaLabelledBy();o.removeAllDependents();o.destroy();}t._ctrl=n;};var j=function(K,A){var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");if(r){return r.getText(K,A);}return K;};var k=function(){return sap.ui.Device.browser.mobile&&!sap.ui.Device.system.desktop;};var m=function(r,o){r.write("<div");r.writeAttributeEscaped('id',o.getId()+'-searchico');r.writeAttribute('unselectable','on');if(sap.ui.getCore().getConfiguration().getAccessibility()){r.writeAttribute("role","presentation");}r.addClass("sapUiSearchFieldIco");r.writeClasses();r.write("></div>");};T.extend("sap.ui.commons.SearchField.TF",{metadata:{visibility:"hidden"},constructor:function(i,s){T.apply(this,arguments);},getInputDomRef:function(){return this.getDomRef("input");},onkeyup:function(E){d.CB.prototype.onkeyup.apply(this,arguments);},_triggerSuggest:function(s){this._sSuggest=null;if((s&&s.length>=this.getParent().getStartSuggestion())||(!s&&this.getParent().getStartSuggestion()==0)){this.getParent().fireSuggest({value:s});}},_checkChange:function(E,D){this.getParent().fireSearch({noFocus:D});},onsapfocusleave:function(E){if(this.getEditable()&&this.getEnabled()&&this.getRenderer().onblur&&E.relatedControlId!=this.getId()){this.getRenderer().onblur(this);}this._checkChange(E,true);},onclick:function(E){if(E.target===this.getDomRef("searchico")){if(this.oPopup&&this.oPopup.isOpen()){this.oPopup.close();}if(this.getEditable()&&this.getEnabled()){this.focus();}if(!this.getParent().getEnableClear()){this._checkChange(E);}else{if(!q(this.getInputDomRef()).val()||!this.getEditable()||!this.getEnabled()){return;}this.setValue("");this._triggerValueHelp=true;this.onkeyup();if(this.getParent().getEnableFilterMode()){q(this.getInputDomRef()).val("");this.getParent().fireSearch();}}}},getMaxPopupItems:function(){return this._iVisibleItemCount?this._iVisibleItemCount:_;},setMaxPopupItems:function(M){this._iVisibleItemCount=M;},renderer:{renderOuterContentBefore:m,renderOuterAttributes:function(r,o){r.addClass("sapUiSearchFieldTf");},renderInnerAttributes:function(r,o){if(!sap.ui.Device.os.ios){r.writeAttribute("type","search");}if(k()){r.writeAttribute('autocapitalize','off');r.writeAttribute('autocorrect','off');}}}});d.TF.prototype.getFocusDomRef=d.TF.prototype.getInputDomRef;C.extend("sap.ui.commons.SearchField.CB",{metadata:{visibility:"hidden"},constructor:function(i,s){C.apply(this,arguments);this._mSuggestions={};this._aSuggestValues=[];this.mobile=false;},updateSuggestions:function(s,i){this._mSuggestions[s]=i;if(this.getInputDomRef()&&q(this.getInputDomRef()).val()===s&&this._hasSuggestValue(s)){this._doUpdateList(s);}},applyFocusInfo:function(F){q(this.getInputDomRef()).val(F.sTypedChars);return this;},_getListBox:function(){return this.getParent()._lb;},_hasSuggestValue:function(s){return this._aSuggestValues.length>0&&s==this._aSuggestValues[this._aSuggestValues.length-1];},_doUpdateList:function(s,i){var E=this._updateList(s);this._aSuggestValues=[s];if((!this.oPopup||!this.oPopup.isOpen())&&!i&&!E){this._open();}else if(this.oPopup&&this.oPopup.isOpen()&&E){this._close();}if(!E&&!this._lastKeyIsDel&&s===q(this.getInputDomRef()).val()){this._doTypeAhead();}},onclick:function(E){C.prototype.onclick.apply(this,arguments);if(E.target===this.getDomRef("searchico")){if(this.oPopup&&this.oPopup.isOpen()){this.oPopup.close();}if(!this.getParent().getEnableClear()){this.getParent().fireSearch();}else if(q(this.getInputDomRef()).val()&&this.getEditable()&&this.getEnabled()){this.setValue("");this._triggerValueHelp=true;this.onkeyup();this._aSuggestValues=[];if(this.getParent().getEnableFilterMode()){q(this.getInputDomRef()).val("");this.getParent().fireSearch();}}if(this.getEditable()&&this.getEnabled()){this.focus();}}else if(q.sap.containsOrEquals(this.getDomRef("providerico"),E.target)){if(this.getEditable()&&this.getEnabled()){this.focus();}}},onkeypress:d.TF.prototype.onkeypress,onkeyup:function(E){var i=q(this.getInputDomRef());var v=i.val();this.getParent().$().toggleClass("sapUiSearchFieldVal",!!v);e(this.getParent());if(E){var K=q.sap.KeyCodes;if(E.keyCode===K.F2){var F=q(this.getFocusDomRef());var D=F.data("sap.InNavArea");if(typeof D==="boolean"){F.data("sap.InNavArea",!D);}}if(C._isHotKey(E)||E.keyCode===K.F4&&E.which===0){return;}if(v&&v==i.getSelectedText()){return;}var n=E.which||E.keyCode;if(n!==K.ESCAPE||this instanceof d.TF){this._triggerValueHelp=true;this._lastKeyIsDel=n==K.DELETE||n==K.BACKSPACE;}}if(this._triggerValueHelp){this._triggerValueHelp=false;if(this._sSuggest){q.sap.clearDelayedCall(this._sSuggest);this._sSuggest=null;}var s=q(this.getInputDomRef()).val();if((s&&s.length>=this.getParent().getStartSuggestion())||(!s&&this.getParent().getStartSuggestion()==0)){this._sSuggest=q.sap.delayedCall(200,this,"_triggerSuggest",[s]);}else if(this._doUpdateList){this._doUpdateList(s,true);}}},_triggerSuggest:function(s){this._sSuggest=null;if(!this._mSuggestions[s]||!this.getParent().getEnableCache()){this._aSuggestValues.push(s);var o=this.getParent().getSearchProvider();if(o){var i=this.getParent();o.suggest(s,function(v,n){if(i){i.suggest(v,n);}});}else{this.getParent().fireSuggest({value:s});}}else{this._doUpdateList(s);}},_updateList:function(s){var E=false;var o=this._getListBox();o.destroyAggregation("items",true);var n=function(o,v,t,u){v=v?v:[];var w=Math.min(v.length,t);if(u&&w>0){o.addItem(new sap.ui.core.SeparatorItem());}for(var i=0;i<w;i++){o.addItem(new sap.ui.core.ListItem({text:v[i]}));}return w;};var p=n(o,this.getParent()._oHistory.get(s),this.getParent().getMaxHistoryItems(),false);var r=n(o,s&&s.length>=this.getParent().getStartSuggestion()?this._mSuggestions[s]:[],this.getParent().getMaxSuggestionItems(),p>0);if(p<=0&&r==0){o.addItem(new sap.ui.core.ListItem({text:j("SEARCHFIELD_NO_ITEMS"),enabled:false}));E=true;}var I=o.getItems().length;var M=this.getMaxPopupItems();o.setVisibleItems(M<I?M:I);o.setSelectedIndex(-1);o.setMinWidth(q(this.getDomRef()).rect().width+"px");o.rerender();return E;},_prepareOpen:function(){},_open:function(){C.prototype._open.apply(this,[0]);},_rerenderListBox:function(){return this._updateList(this._aSuggestValues.length>0?this._aSuggestValues[this._aSuggestValues.length-1]:null)&&!this._forceOpen;},_checkChange:function(E,i,D){this.getParent().fireSearch({noFocus:D});},onsapfocusleave:function(E){if(E.relatedControlId===this._getListBox().getId()){this.focus();return;}this._checkChange(E,true,true);},onfocusout:function(E){if(this.getEditable()&&this.getEnabled()&&this.getRenderer().onblur){this.getRenderer().onblur(this);}this._checkChange(E,true,true);},onsapshow:function(E){if(this.getParent().hasListExpander()){C.prototype.onsapshow.apply(this,arguments);}else{E.preventDefault();E.stopImmediatePropagation();}},_handleSelect:function(o){var i=C.prototype._handleSelect.apply(this,arguments);if(i&&i.getEnabled()){this.getParent().fireSearch();}},renderer:{renderOuterContentBefore:function(r,o){if(o.getParent().hasListExpander()){a.renderOuterContentBefore.apply(this,arguments);}m.apply(this,arguments);if(o.getParent().getSearchProvider()&&o.getParent().getSearchProvider().getIcon()){r.write("<div");r.writeAttributeEscaped('id',o.getId()+'-providerico');r.writeAttribute('unselectable','on');if(sap.ui.getCore().getConfiguration().getAccessibility()){r.writeAttribute("role","presentation");}r.addClass("sapUiSearchFieldProvIco");r.writeClasses();r.write("><img src=\""+o.getParent().getSearchProvider().getIcon()+"\"/></div>");}},renderOuterAttributes:function(r,o){a.renderOuterAttributes.apply(this,arguments);r.addClass("sapUiSearchFieldCb");if(o.getParent().getSearchProvider()&&o.getParent().getSearchProvider().getIcon()){r.addClass("sapUiSearchFieldCbProv");}},renderInnerAttributes:function(r,o){if(!sap.ui.Device.os.ios){r.writeAttribute("type","search");}if(k()){r.writeAttribute('autocapitalize','off');r.writeAttribute('autocorrect','off');}}}});}());return d;},true);
