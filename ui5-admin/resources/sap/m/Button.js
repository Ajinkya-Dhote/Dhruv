/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','sap/ui/core/EnabledPropagator','sap/ui/core/IconPool','sap/ui/Device','sap/ui/core/ContextMenuSupport','sap/ui/core/library','./ButtonRenderer',"sap/ui/events/KeyCodes"],function(l,C,E,I,D,a,c,B,K){"use strict";var T=c.TextDirection;var b=l.ButtonType;var d=C.extend("sap.m.Button",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{text:{type:"string",group:"Misc",defaultValue:null},type:{type:"sap.m.ButtonType",group:"Appearance",defaultValue:b.Default},width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},iconFirst:{type:"boolean",group:"Appearance",defaultValue:true},activeIcon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconDensityAware:{type:"boolean",group:"Misc",defaultValue:true},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:T.Inherit}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{tap:{deprecated:true},press:{}},designtime:"sap/m/designtime/Button.designtime"}});E.call(d.prototype);a.apply(d.prototype);d.prototype.exit=function(){if(this._image){this._image.destroy();}if(this._iconBtn){this._iconBtn.destroy();}};d.prototype.onBeforeRendering=function(){this._bRenderActive=this._bActive;};d.prototype.onAfterRendering=function(){if(this._bRenderActive){this._activeButton();this._bRenderActive=this._bActive;}};d.prototype.ontouchstart=function(e){e.setMarked();if(this._bRenderActive){delete this._bRenderActive;}if(e.targetTouches.length===1){this._activeButton();}if(this.getEnabled()&&this.getVisible()){if(D.browser.safari&&(e.originalEvent&&e.originalEvent.type==="mousedown")){this.focus();e.preventDefault();}}};d.prototype.ontouchend=function(e){this._inactiveButton();if(this._bRenderActive){delete this._bRenderActive;if(e.originalEvent&&e.originalEvent.type in{mouseup:1,touchend:1}){this.ontap(e);}}};d.prototype.ontouchcancel=function(){this._inactiveButton();};d.prototype.ontap=function(e){e.setMarked();if(this.getEnabled()&&this.getVisible()){if((e.originalEvent&&e.originalEvent.type==="touchend")){this.focus();}this.fireTap({});this.firePress({});}};d.prototype.onkeydown=function(e){if(e.which===K.SPACE||e.which===K.ENTER){e.setMarked();this._activeButton();}if(e.which===K.ENTER){this.firePress({});}};d.prototype.onkeyup=function(e){if(e.which===K.SPACE||e.which===K.ENTER){e.setMarked();this._inactiveButton();}if(e.which===K.SPACE){this.firePress({});}};d.prototype.onfocusout=function(){this._inactiveButton();};d.prototype._activeButton=function(){if(!this._isUnstyled()){this.$("inner").addClass("sapMBtnActive");}this._bActive=this.getEnabled();if(this._bActive){if(this.getIcon()&&this.getActiveIcon()&&this._image){this._image.setSrc(this.getActiveIcon());}}};d.prototype._inactiveButton=function(){if(!this._isUnstyled()){this.$("inner").removeClass("sapMBtnActive");}this._bActive=false;if(this.getEnabled()){if(this.getIcon()&&this.getActiveIcon()&&this._image){this._image.setSrc(this.getIcon());}}};d.prototype._isHoverable=function(){return this.getEnabled()&&D.system.desktop;};d.prototype._getImage=function(i,s,A,e){if(this._image&&(this._image.getSrc()!==s)){this._image.destroy();this._image=undefined;}var o=this._image;var f=this.getIconFirst();if(!!o){o.setSrc(s);if(o instanceof sap.m.Image){o.setActiveSrc(A);o.setDensityAware(e);}}else{o=I.createControlByURI({id:i,src:s,activeSrc:A,densityAware:e,useIconTooltip:false},sap.m.Image).addStyleClass("sapMBtnCustomIcon").setParent(this,null,true);}o.addStyleClass("sapMBtnIcon");o.toggleStyleClass("sapMBtnIconLeft",f);o.toggleStyleClass("sapMBtnIconRight",!f);this._image=o;return this._image;};d.prototype._getInternalIconBtn=function(i,s){var o=this._iconBtn;if(o){o.setSrc(s);}else{o=I.createControlByURI({id:i,src:s,useIconTooltip:false},sap.m.Image).setParent(this,null,true);}o.addStyleClass("sapMBtnIcon");o.addStyleClass("sapMBtnIconLeft");this._iconBtn=o;return this._iconBtn;};d.prototype._isUnstyled=function(){var u=false;if(this.getType()===b.Unstyled){u=true;}return u;};d.prototype.setText=function(t){var v=this.getText();if(t===null||t===undefined){t="";}if(v!==t){var o=this.getDomRef("BDI-content")||this.getDomRef("content");var s=!!o;this.setProperty("text",t,s);if(s){t=this.getText();o.textContent=t;this.$("inner").toggleClass("sapMBtnText",!!t);}}return this;};d.prototype.setIcon=function(i){var v=this.getIcon()||"";i=i||"";if(v!==i){var s=!!v&&!!i&&I.isIconURI(i)===I.isIconURI(v);this.setProperty("icon",i,s);if(s&&this._image){this._image.setSrc(i);}}return this;};d.prototype.getPopupAnchorDomRef=function(){return this.getDomRef("inner");};d.prototype._getText=function(){return this.getText();};d.prototype._getTooltip=function(){var t=this.getTooltip_AsString();if(!t&&!this.getText()){var i=I.getIconInfo(this.getIcon());if(i&&i.text){t=i.text;}}return t;};d.prototype.getAccessibilityInfo=function(){var s=this.getText()||this.getTooltip_AsString();if(!s&&this.getIcon()){var i=I.getIconInfo(this.getIcon());if(i){s=i.text||i.name;}}return{role:"button",type:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_BUTTON"),description:s,focusable:this.getEnabled(),enabled:this.getEnabled()};};return d;});
