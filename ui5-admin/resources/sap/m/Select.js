/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./Dialog','./Popover','./SelectList','./library','sap/ui/core/Control','sap/ui/core/EnabledPropagator','sap/ui/core/IconPool','./Button','./Bar','./Title','./delegate/ValueStateMessage','sap/ui/core/message/MessageMixin','sap/ui/core/library','sap/ui/core/Item','sap/ui/Device','sap/ui/core/InvisibleText','./SelectRenderer',"sap/ui/dom/containsOrEquals","sap/ui/events/KeyCodes"],function(D,P,S,l,C,E,I,B,a,T,V,M,c,b,d,e,f,g,K){"use strict";var h=l.SelectListKeyboardNavigationMode;var j=l.PlacementType;var k=c.ValueState;var m=c.TextDirection;var n=c.TextAlign;var o=l.SelectType;var p=C.extend("sap.m.Select",{metadata:{interfaces:["sap.ui.core.IFormContent","sap.m.IOverflowToolbarContent"],library:"sap.m",properties:{name:{type:"string",group:"Misc",defaultValue:""},enabled:{type:"boolean",group:"Behavior",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"auto"},maxWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},selectedKey:{type:"string",group:"Data",defaultValue:""},selectedItemId:{type:"string",group:"Misc",defaultValue:""},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""},type:{type:"sap.m.SelectType",group:"Appearance",defaultValue:o.Default},autoAdjustWidth:{type:"boolean",group:"Appearance",defaultValue:false},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:n.Initial},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:m.Inherit},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:k.None},valueStateText:{type:"string",group:"Misc",defaultValue:""},showSecondaryValues:{type:"boolean",group:"Misc",defaultValue:false},forceSelection:{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.core.Item",multiple:true,singularName:"item",bindable:"bindable",forwarding:{getter:"getList",aggregation:"items"}},picker:{type:"sap.ui.core.PopupInterface",multiple:false,visibility:"hidden"},_pickerHeader:{type:"sap.m.Bar",multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}}},designtime:"sap/m/designtime/Select.designtime"}});I.insertFontFaceStyle();E.apply(p.prototype,[true]);M.call(p.prototype);function H(i){if(i){this.setSelection(i);this.setValue(i.getText());this.scrollToItem(i);}}p.prototype._handleFocusout=function(i){this._bFocusoutDueRendering=this.bRenderingPhase;if(this._bFocusoutDueRendering){this._bProcessChange=false;return;}if(this._bProcessChange){if(!this.isOpen()||i.target===this.getAggregation("picker")){this._checkSelectionChange();}else{this._revertSelection();}this._bProcessChange=false;}else{this._bProcessChange=true;}};p.prototype._checkSelectionChange=function(){var i=this.getSelectedItem();if(this._oSelectionOnFocus!==i){this.fireChange({selectedItem:i});}};p.prototype._revertSelection=function(){var i=this.getSelectedItem();if(this._oSelectionOnFocus!==i){this.setSelection(this._oSelectionOnFocus);this.setValue(this._getSelectedItemText());}};p.prototype._getSelectedItemText=function(i){i=i||this.getSelectedItem();if(!i){i=this.getDefaultSelectedItem();}if(i){return i.getText();}return"";};p.prototype.getOverflowToolbarConfig=function(){var i=["enabled","selectedKey"];if(!this.getAutoAdjustWidth()||this._bIsInOverflow){i.push("selectedItemId");}var q={canOverflow:true,autoCloseEvents:["change"],invalidationEvents:["_itemTextChange"],propsUnrelatedToSize:i};q.onBeforeEnterOverflow=function(s){var t=s.getParent();if(!t.isA("sap.m.OverflowToolbar")){return;}s._prevSelectType=s.getType();s._bIsInOverflow=true;if(s.getType()!==o.Default){s.setProperty("type",o.Default,true);}};q.onAfterExitOverflow=function(s){var t=s.getParent();if(!t.isA("sap.m.OverflowToolbar")){return;}s._bIsInOverflow=false;if(s.getType()!==s._prevSelectType){s.setProperty("type",s._prevSelectType,true);}};return q;};p.prototype.getList=function(){if(this.bIsDestroyed){return null;}return this._oList;};p.prototype.findFirstEnabledItem=function(i){var L=this.getList();return L?L.findFirstEnabledItem(i):null;};p.prototype.findLastEnabledItem=function(i){var L=this.getList();return L?L.findLastEnabledItem(i):null;};p.prototype.setSelectedIndex=function(i,_){var q;_=_||this.getItems();i=(i>_.length-1)?_.length-1:Math.max(0,i);q=_[i];if(q){this.setSelection(q);}};p.prototype.scrollToItem=function(i){var q=this.getPicker(),r=q.getDomRef("cont"),s=i&&i.getDomRef();if(!q||!r||!s){return;}var t=r.scrollTop,u=s.offsetTop,v=r.clientHeight,w=s.offsetHeight;if(t>u){r.scrollTop=u;}else if((u+w)>(t+v)){r.scrollTop=Math.ceil(u+w-v);}};p.prototype.setValue=function(v){this.$("label").text(v);};p.prototype._isShadowListRequired=function(){if(this.getAutoAdjustWidth()){return false;}else if(this.getWidth()==="auto"){return true;}return false;};p.prototype._handleAriaActiveDescendant=function(i){var q=this.getDomRef(),r=i&&i.getDomRef(),A="aria-activedescendant";if(!q){return;}if(r&&this.isOpen()){q.setAttribute(A,i.getId());}else{q.removeAttribute(A);}};p.prototype.updateItems=function(r){S.prototype.updateItems.apply(this,arguments);this._oSelectionOnFocus=this.getSelectedItem();};p.prototype.refreshItems=function(){S.prototype.refreshItems.apply(this,arguments);};p.prototype.onBeforeOpen=function(i){var q=this["_onBeforeOpen"+this.getPickerType()],r=this.getRenderer().CSS_CLASS;this.addStyleClass(r+"Pressed");this.addStyleClass(r+"Expanded");this.closeValueStateMessage();this.addContent();q&&q.call(this);};p.prototype.onAfterOpen=function(i){var q=this.getFocusDomRef(),r=null,$=this.$("label");if(!q){return;}r=this.getSelectedItem();q.setAttribute("aria-expanded","true");$.attr("aria-live",null);q.setAttribute("aria-owns",this.getList().getId());if(r){q.setAttribute("aria-activedescendant",r.getId());this.scrollToItem(r);}};p.prototype.onBeforeClose=function(i){var q=this.getFocusDomRef(),r=this.getRenderer().CSS_CLASS;if(q){q.removeAttribute("aria-owns");q.removeAttribute("aria-activedescendant");if(this.shouldValueStateMessageBeOpened()&&(document.activeElement===q)){this.openValueStateMessage();}}this.removeStyleClass(r+"Expanded");};p.prototype.onAfterClose=function(i){var q=this.getFocusDomRef(),r=this.getRenderer().CSS_CLASS,s=r+"Pressed",$=this.$("label");if(q){q.setAttribute("aria-expanded","false");q.removeAttribute("aria-activedescendant");$.attr("aria-live","polite");}this.removeStyleClass(s);};p.prototype.getPicker=function(){if(this.bIsDestroyed){return null;}return this.createPicker(this.getPickerType());};p.prototype.setPickerType=function(s){this._sPickerType=s;};p.prototype.getPickerType=function(){return this._sPickerType;};p.prototype._createPopover=function(){var t=this;var i=new P({showArrow:false,showHeader:false,placement:j.VerticalPreferredBottom,offsetX:0,offsetY:0,initialFocus:this,bounce:false,ariaLabelledBy:this._getPickerHiddenLabelId()});i.addEventDelegate({ontouchstart:function(q){var r=this.getDomRef("cont");if((q.target===r)||(q.srcControl instanceof b)){t._bProcessChange=false;}}},i);this._decoratePopover(i);return i;};p.prototype._decoratePopover=function(i){var t=this;i.open=function(){return this.openBy(t);};};p.prototype._onBeforeRenderingPopover=function(){var i=this.getPicker(),w=this.$().outerWidth()+"px";if(i){i.setContentMinWidth(w);}};p.prototype._createDialog=function(){var t=this;return new D({stretch:true,ariaLabelledBy:this._getPickerHiddenLabelId(),customHeader:this._getPickerHeader(),beforeOpen:function(){t.updatePickerHeaderTitle();}});};p.prototype._getPickerTitle=function(){var i=this.getPicker(),q=i&&i.getCustomHeader();if(q){return q.getContentMiddle()[0];}return null;};p.prototype._getPickerHeader=function(){var i=I.getIconURI("decline"),r;if(!this.getAggregation("_pickerHeader")){r=sap.ui.getCore().getLibraryResourceBundle("sap.m");this.setAggregation("_pickerHeader",new a({contentMiddle:new T({text:r.getText("SELECT_PICKER_TITLE_TEXT")}),contentRight:new B({icon:i,press:this.close.bind(this)})}));}return this.getAggregation("_pickerHeader");};p.prototype._getPickerHiddenLabelId=function(){return e.getStaticId("sap.m","INPUT_AVALIABLE_VALUES");};p.prototype.updatePickerHeaderTitle=function(){var i=this.getPicker();if(!i){return;}var L=this.getLabels();if(L.length){var q=L[0],r=this._getPickerTitle();if(q&&(typeof q.getText==="function")){r&&r.setText(q.getText());}}};p.prototype._onBeforeOpenDialog=function(){};p.prototype.init=function(){this.setPickerType(d.system.phone?"Dialog":"Popover");this.createPicker(this.getPickerType());this._oSelectionOnFocus=null;this.bRenderingPhase=false;this._bFocusoutDueRendering=false;this._bProcessChange=false;this.sTypedChars="";this.iTypingTimeoutID=-1;this._oValueStateMessage=new V(this);};p.prototype.onBeforeRendering=function(){this.bRenderingPhase=true;if(d.browser.firefox&&(this.getFocusDomRef()===document.activeElement)){this._handleFocusout();}this.synchronizeSelection();};p.prototype.onAfterRendering=function(){this.bRenderingPhase=false;};p.prototype.exit=function(){var v=this.getValueStateMessage();this._oSelectionOnFocus=null;if(v){this.closeValueStateMessage();v.destroy();}this._oValueStateMessage=null;};p.prototype.ontouchstart=function(i){i.setMarked();if(this.getEnabled()&&this.isOpenArea(i.target)){this.addStyleClass(this.getRenderer().CSS_CLASS+"Pressed");}};p.prototype.ontouchend=function(i){i.setMarked();if(this.getEnabled()&&!this.isOpen()&&this.isOpenArea(i.target)){this.removeStyleClass(this.getRenderer().CSS_CLASS+"Pressed");}};p.prototype.ontap=function(i){var q=this.getRenderer().CSS_CLASS;i.setMarked();if(!this.getEnabled()){return;}if(this.isOpenArea(i.target)){if(this.isOpen()){this.close();this.removeStyleClass(q+"Pressed");return;}if(d.system.phone){this.focus();}this.open();}if(this.isOpen()){this.addStyleClass(q+"Pressed");}};p.prototype.onSelectionChange=function(i){var q=i.getParameter("selectedItem");this.close();this.setSelection(q);this.fireChange({selectedItem:q});this.setValue(this._getSelectedItemText());};p.prototype.onkeypress=function(i){if(!this.getEnabled()){return;}i.setMarked();var t=String.fromCharCode(i.which),s=this.getSelectedItem(),q=t,r=null;this.sTypedChars+=t;var u=typeof this.sTypedChars==="string"&&this.sTypedChars!==""&&s&&s.getText().toLowerCase().startsWith(this.sTypedChars.toLowerCase());if(u||((this.sTypedChars.length===1)||((this.sTypedChars.length>1)&&(this.sTypedChars.charAt(0)!==this.sTypedChars.charAt(1))))){q=this.sTypedChars;}r=this.searchNextItemByText(q);clearTimeout(this.iTypingTimeoutID);this.iTypingTimeoutID=setTimeout(function(){this.sTypedChars="";this.iTypingTimeoutID=-1;}.bind(this),1000);H.call(this,r);};p.prototype.onsapshow=function(i){if(!this.getEnabled()){return;}i.setMarked();if(i.which===K.F4){i.preventDefault();}this.toggleOpenState();};p.prototype.onsaphide=p.prototype.onsapshow;p.prototype.onsapescape=function(i){if(!this.getEnabled()){return;}if(this.isOpen()){i.setMarked();this.close();this._revertSelection();}};p.prototype.onsapenter=function(i){if(!this.getEnabled()){return;}i.setMarked();this.close();this._checkSelectionChange();};p.prototype.onsapspace=function(i){if(!this.getEnabled()){return;}i.setMarked();i.preventDefault();if(this.isOpen()){this._checkSelectionChange();}this.toggleOpenState();};p.prototype.onsapdown=function(i){if(!this.getEnabled()){return;}i.setMarked();i.preventDefault();var N,s=this.getSelectableItems();N=s[s.indexOf(this.getSelectedItem())+1];H.call(this,N);};p.prototype.onsapup=function(i){if(!this.getEnabled()){return;}i.setMarked();i.preventDefault();var q,s=this.getSelectableItems();q=s[s.indexOf(this.getSelectedItem())-1];H.call(this,q);};p.prototype.onsaphome=function(i){if(!this.getEnabled()){return;}i.setMarked();i.preventDefault();var F=this.getSelectableItems()[0];H.call(this,F);};p.prototype.onsapend=function(i){if(!this.getEnabled()){return;}i.setMarked();i.preventDefault();var L=this.findLastEnabledItem(this.getSelectableItems());H.call(this,L);};p.prototype.onsappagedown=function(i){if(!this.getEnabled()){return;}i.setMarked();i.preventDefault();var s=this.getSelectableItems(),q=this.getSelectedItem();this.setSelectedIndex(s.indexOf(q)+10,s);q=this.getSelectedItem();if(q){this.setValue(q.getText());}this.scrollToItem(q);};p.prototype.onsappageup=function(i){if(!this.getEnabled()){return;}i.setMarked();i.preventDefault();var s=this.getSelectableItems(),q=this.getSelectedItem();this.setSelectedIndex(s.indexOf(q)-10,s);q=this.getSelectedItem();if(q){this.setValue(q.getText());}this.scrollToItem(q);};p.prototype.onsaptabnext=function(i){if(!this.getEnabled()){return;}if(this.isOpen()){this.close();}};p.prototype.onsaptabprevious=p.prototype.onsaptabnext;p.prototype.onfocusin=function(i){if(!this._bFocusoutDueRendering&&!this._bProcessChange){this._oSelectionOnFocus=this.getSelectedItem();}this._bProcessChange=true;setTimeout(function(){if(!this.isOpen()&&this.shouldValueStateMessageBeOpened()&&(document.activeElement===this.getFocusDomRef())){this.openValueStateMessage();}}.bind(this),100);if(i.target!==this.getFocusDomRef()){this.focus();}};p.prototype.onfocusout=function(i){this._handleFocusout(i);if(this.bRenderingPhase){return;}this.closeValueStateMessage();};p.prototype.onsapfocusleave=function(i){var q=this.getAggregation("picker");if(!i.relatedControlId||!q){return;}var r=sap.ui.getCore().byId(i.relatedControlId),F=r&&r.getFocusDomRef();if(d.system.desktop&&g(q.getFocusDomRef(),F)){this.focus();}};p.prototype.setSelection=function(i){var L=this.getList(),s;if(L){L.setSelection(i);}this.setAssociation("selectedItem",i,true);this.setProperty("selectedItemId",(i instanceof b)?i.getId():i,true);if(typeof i==="string"){i=sap.ui.getCore().byId(i);}s=i?i.getKey():"";this.setProperty("selectedKey",s,true);this._handleAriaActiveDescendant(i);};p.prototype.isSelectionSynchronized=function(){var i=this.getSelectedItem();return this.getSelectedKey()===(i&&i.getKey());};p.prototype.synchronizeSelection=function(){S.prototype.synchronizeSelection.apply(this,arguments);};p.prototype.addContent=function(i){};p.prototype.createPicker=function(s){var i=this.getAggregation("picker"),q=this.getRenderer().CSS_CLASS;if(i){return i;}i=this["_create"+s]();this.setAggregation("picker",i,true);i.setHorizontalScrolling(false).addStyleClass(q+"Picker").addStyleClass(q+"Picker-CTX").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPicker,onAfterRendering:this.onAfterRenderingPicker},this).addContent(this.createList());return i;};p.prototype.searchNextItemByText=function(t){var q=this.getItems(),s=this.getSelectedIndex(),r=q.splice(s+1,q.length-s),u=q.splice(0,q.length-1);q=r.concat(u);for(var i=0,v;i<q.length;i++){v=q[i];var w=typeof t==="string"&&t!=="";if(v.getEnabled()&&!(v instanceof sap.ui.core.SeparatorItem)&&v.getText().toLowerCase().startsWith(t.toLowerCase())&&w){return v;}}return null;};p.prototype.createList=function(){var L=h,s=d.system.phone?L.Delimited:L.None;this._oList=new S({width:"100%",keyboardNavigationMode:s}).addStyleClass(this.getRenderer().CSS_CLASS+"List-CTX").addEventDelegate({ontap:function(i){this._checkSelectionChange();this.close();}},this).attachSelectionChange(this.onSelectionChange,this);return this._oList;};p.prototype.hasContent=function(){return this.getItems().length>0;};p.prototype.onBeforeRenderingPicker=function(){var O=this["_onBeforeRendering"+this.getPickerType()];O&&O.call(this);};p.prototype.onAfterRenderingPicker=function(){var O=this["_onAfterRendering"+this.getPickerType()];O&&O.call(this);};p.prototype.open=function(){var i=this.getPicker();if(i){i.open();}return this;};p.prototype.toggleOpenState=function(){if(this.isOpen()){this.close();}else{this.open();}return this;};p.prototype.getVisibleItems=function(){var L=this.getList();return L?L.getVisibleItems():[];};p.prototype.isItemSelected=function(i){return i&&(i.getId()===this.getAssociation("selectedItem"));};p.prototype.getSelectedIndex=function(){var s=this.getSelectedItem();return s?this.indexOfItem(this.getSelectedItem()):-1;};p.prototype.getDefaultSelectedItem=function(i){return this.getForceSelection()?this.findFirstEnabledItem():null;};p.prototype.getSelectableItems=function(){var L=this.getList();return L?L.getSelectableItems():[];};p.prototype.getOpenArea=function(){return this.getDomRef();};p.prototype.isOpenArea=function(i){var O=this.getOpenArea();return O&&O.contains(i);};p.prototype.findItem=function(s,v){var L=this.getList();return L?L.findItem(s,v):null;};p.prototype.clearSelection=function(){this.setSelection(null);};p.prototype.onItemChange=function(i){var s=this.getAssociation("selectedItem"),N=i.getParameter("newValue"),q=i.getParameter("name");if(s===i.getParameter("id")){switch(q){case"text":this.fireEvent("_itemTextChange");this.setValue(N);break;case"key":if(!this.isBound("selectedKey")){this.setSelectedKey(N);}break;}}};p.prototype.fireChange=function(i){this._oSelectionOnFocus=i.selectedItem;return this.fireEvent("change",i);};p.prototype.addAggregation=function(A,O,s){if(A==="items"&&!s&&!this.isInvalidateSuppressed()){this.invalidate(O);}return C.prototype.addAggregation.apply(this,arguments);};p.prototype.destroyAggregation=function(A,s){if(A==="items"&&!s&&!this.isInvalidateSuppressed()){this.invalidate();}return C.prototype.destroyAggregation.apply(this,arguments);};p.prototype.setAssociation=function(A,i,s){var L=this.getList();if(L&&(A==="selectedItem")){S.prototype.setAssociation.apply(L,arguments);}return C.prototype.setAssociation.apply(this,arguments);};p.prototype.setProperty=function(s,v,i){var L=this.getList();if((s==="selectedKey")||(s==="selectedItemId")){L&&S.prototype.setProperty.apply(L,arguments);}return C.prototype.setProperty.apply(this,arguments);};p.prototype.removeAllAssociation=function(A,s){var L=this.getList();if(L&&(A==="selectedItem")){S.prototype.removeAllAssociation.apply(L,arguments);}return C.prototype.removeAllAssociation.apply(this,arguments);};p.prototype.clone=function(){var s=C.prototype.clone.apply(this,arguments),i=this.getSelectedItem(),q=this.getSelectedKey();if(!this.isBound("selectedKey")&&!s.isSelectionSynchronized()){if(i&&(q==="")){s.setSelectedIndex(this.indexOfItem(i));}else{s.setSelectedKey(q);}}return s;};p.prototype.updateValueStateClasses=function(v,O){var t=this.$(),L=this.$("label"),A=this.$("arrow"),i=k,q=this.getRenderer().CSS_CLASS;if(O!==i.None){t.removeClass(q+"State");t.removeClass(q+O);L.removeClass(q+"LabelState");L.removeClass(q+"Label"+O);A.removeClass(q+"ArrowState");}if(v!==i.None){t.addClass(q+"State");t.addClass(q+v);L.addClass(q+"LabelState");L.addClass(q+"Label"+v);A.addClass(q+"ArrowState");}};p.prototype.updateAriaLabelledBy=function(v,O){var $=this.$(),A=$.attr("aria-labelledby"),i=A?A.split(" "):[],N;if(O!==k.None){i.pop();}if(v!==k.None){i.push(e.getStaticId("sap.ui.core","VALUE_STATE_"+v.toUpperCase()));}N=i.join(" ");$.attr("aria-labelledby",N);};p.prototype.getLabels=function(){var L=this.getAriaLabelledBy().map(function(s){return sap.ui.getCore().byId(s);});var i=sap.ui.require("sap/ui/core/LabelEnablement");if(i){L=L.concat(i.getReferencingLabels(this).map(function(s){return sap.ui.getCore().byId(s);}));}return L;};p.prototype.getDomRefForValueStateMessage=function(){return this.getDomRef();};p.prototype.getValueStateMessageId=function(){return this.getId()+"-message";};p.prototype.getValueStateMessage=function(){return this._oValueStateMessage;};p.prototype.openValueStateMessage=function(){var v=this.getValueStateMessage();if(v){v.open();}};p.prototype.closeValueStateMessage=function(){var v=this.getValueStateMessage();if(v){v.close();}};p.prototype.shouldValueStateMessageBeOpened=function(){return(this.getValueState()!==k.None)&&this.getEnabled();};p.prototype.setShowSecondaryValues=function(A){var s=!this._isShadowListRequired();this.setProperty("showSecondaryValues",A,s);var L=this.getList();if(L){L.setShowSecondaryValues(A);}return this;};p.prototype.addItem=function(i){this.addAggregation("items",i);if(i){i.attachEvent("_change",this.onItemChange,this);}return this;};p.prototype.insertItem=function(i,q){this.insertAggregation("items",i,q);if(i){i.attachEvent("_change",this.onItemChange,this);}return this;};p.prototype.findAggregatedObjects=function(){var L=this.getList();if(L){return S.prototype.findAggregatedObjects.apply(L,arguments);}return[];};p.prototype.getItems=function(){var L=this.getList();return L?L.getItems():[];};p.prototype.setSelectedItem=function(i){if(typeof i==="string"){this.setAssociation("selectedItem",i,true);i=sap.ui.getCore().byId(i);}if(!(i instanceof b)&&i!==null){return this;}if(!i){i=this.getDefaultSelectedItem();}this.setSelection(i);this.setValue(this._getSelectedItemText(i));this._oSelectionOnFocus=i;return this;};p.prototype.setSelectedItemId=function(i){i=this.validateProperty("selectedItemId",i);if(!i){i=this.getDefaultSelectedItem();}this.setSelection(i);this.setValue(this._getSelectedItemText());this._oSelectionOnFocus=sap.ui.getCore().byId(i);return this;};p.prototype.setSelectedKey=function(s){s=this.validateProperty("selectedKey",s);var i=(s==="");if(!this.getForceSelection()&&i){this.setSelection(null);this.setValue("");return this;}var q=this.getItemByKey(s);if(q||i){if(!q&&i){q=this.getDefaultSelectedItem();}this.setSelection(q);this.setValue(this._getSelectedItemText(q));this._oSelectionOnFocus=q;return this;}return this.setProperty("selectedKey",s);};p.prototype.setValueState=function(v){var O=this.getValueState();this.setProperty("valueState",v,true);v=this.getValueState();if(v===O){return this;}var i=this.getDomRefForValueState();if(!i){return this;}var q=k;if(v===q.Error){i.setAttribute("aria-invalid",true);}else{i.removeAttribute("aria-invalid");}if(this.shouldValueStateMessageBeOpened()&&document.activeElement===i){this.openValueStateMessage();}else{this.closeValueStateMessage();}this.updateValueStateClasses(v,O);this.updateAriaLabelledBy(v,O);return this;};p.prototype.getItemAt=function(i){return this.getItems()[+i]||null;};p.prototype.getSelectedItem=function(){var s=this.getAssociation("selectedItem");return(s===null)?null:sap.ui.getCore().byId(s)||null;};p.prototype.getFirstItem=function(){return this.getItems()[0]||null;};p.prototype.getLastItem=function(){var i=this.getItems();return i[i.length-1]||null;};p.prototype.getEnabledItems=function(i){var L=this.getList();return L?L.getEnabledItems(i):[];};p.prototype.getItemByKey=function(s){var L=this.getList();return L?L.getItemByKey(s):null;};p.prototype.removeItem=function(i){var q;i=this.removeAggregation("items",i);if(this.getItems().length===0){this.clearSelection();}else if(this.isItemSelected(i)){q=this.findFirstEnabledItem();if(q){this.setSelection(q);}}this.setValue(this._getSelectedItemText());if(i){i.detachEvent("_change",this.onItemChange,this);}return i;};p.prototype.removeAllItems=function(){var q=this.removeAllAggregation("items");this.setValue("");if(this._isShadowListRequired()){this.$().find(".sapMSelectListItemBase").remove();}for(var i=0;i<q.length;i++){q[i].detachEvent("_change",this.onItemChange,this);}return q;};p.prototype.destroyItems=function(){this.destroyAggregation("items");this.setValue("");if(this._isShadowListRequired()){this.$().find(".sapMSelectListItemBase").remove();}return this;};p.prototype.isOpen=function(){var i=this.getAggregation("picker");return!!(i&&i.isOpen());};p.prototype.close=function(){var i=this.getAggregation("picker");if(i){i.close();}return this;};p.prototype.getDomRefForValueState=function(){return this.getDomRef();};p.prototype.getAccessibilityInfo=function(){var i={role:this.getRenderer().getAriaRole(this),focusable:this.getEnabled(),enabled:this.getEnabled()};if(this.getType()==="IconOnly"){var s=this.getTooltip_AsString();if(!s){var q=I.getIconInfo(this.getIcon());s=q&&q.text?q.text:"";}i.type=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_BUTTON");i.description=s;}else if(this.getType()==="Default"){i.type=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_COMBO");i.description=this._getSelectedItemText();}return i;};p.prototype.getIdForLabel=function(){return this.getId()+"-hiddenInput";};return p;});