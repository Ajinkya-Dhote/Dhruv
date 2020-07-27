/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','sap/ui/Device','sap/ui/core/ResizeHandler','sap/ui/core/library','./CarouselRenderer',"sap/ui/events/KeyCodes","sap/base/Log","sap/ui/events/F6Navigation","sap/ui/thirdparty/jquery",'sap/ui/thirdparty/mobify-carousel','sap/ui/core/IconPool'],function(l,C,D,R,c,a,K,L,F,q){"use strict";var B=c.BusyIndicatorSize;var I=l.ImageHelper;var b=l.CarouselArrowsPlacement;var P=l.PlacementType;var d=C.extend("sap.m.Carousel",{metadata:{library:"sap.m",designtime:"sap/m/designtime/Carousel.designtime",properties:{height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},loop:{type:"boolean",group:"Misc",defaultValue:false},showPageIndicator:{type:"boolean",group:"Appearance",defaultValue:true},pageIndicatorPlacement:{type:"sap.m.PlacementType",group:"Appearance",defaultValue:P.Bottom},showBusyIndicator:{type:"boolean",group:"Appearance",defaultValue:true,deprecated:true},arrowsPlacement:{type:"sap.m.CarouselArrowsPlacement",group:"Appearance",defaultValue:b.Content}},defaultAggregation:"pages",aggregations:{pages:{type:"sap.ui.core.Control",multiple:true,singularName:"page"}},associations:{activePage:{type:"sap.ui.core.Control",multiple:false}},events:{loadPage:{deprecated:true,parameters:{pageId:{type:"string"}}},unloadPage:{deprecated:true,parameters:{pageId:{type:"string"}}},pageChanged:{parameters:{oldActivePageId:{type:"string"},newActivePageId:{type:"string"}}}}}});d._INNER_SELECTOR=".sapMCrslInner";d._PAGE_INDICATOR_SELECTOR=".sapMCrslBulleted";d._PAGE_INDICATOR_ARROWS_SELECTOR=".sapMCrslIndicatorArrow";d._CONTROLS=".sapMCrslControls";d._ITEM_SELECTOR=".sapMCrslItem";d._LEFTMOST_CLASS="sapMCrslLeftmost";d._RIGHTMOST_CLASS="sapMCrslRightmost";d._LATERAL_CLASSES="sapMCrslLeftmost sapMCrslRightmost";d._MODIFIERNUMBERFORKEYBOARDHANDLING=10;d._BULLETS_TO_NUMBERS_THRESHOLD=9;d._PREVIOUS_CLASS_ARROW="sapMCrslPrev";d._NEXT_CLASS_ARROW="sapMCrslNext";d.prototype.init=function(){this._aScrollContainers=[];this._fnAdjustAfterResize=q.proxy(function(){var $=this.$().find(d._INNER_SELECTOR);this._oMobifyCarousel.resize($);},this);this.data("sap-ui-fastnavgroup","true",true);};d.prototype.exit=function(){if(this._oMobifyCarousel){this._oMobifyCarousel.destroy();delete this._oMobifyCarousel;}if(this._oArrowLeft){this._oArrowLeft.destroy();delete this._oArrowLeft;}if(this._oArrowRight){this._oArrowRight.destroy();delete this._oArrowRight;}if(this._sResizeListenerId){R.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}this.$().off('afterSlide');this._cleanUpScrollContainer();this._fnAdjustAfterResize=null;this._aScrollContainers=null;this._$InnerDiv=null;};d.prototype._cleanUpScrollContainer=function(){var s;while(this._aScrollContainers&&this._aScrollContainers.length>0){s=this._aScrollContainers.pop();s.destroyContent();if(s&&typeof s.destroy==='function'){s.destroy();}}};d.prototype.ontouchstart=function(e){if(this._oMobifyCarousel){this._oMobifyCarousel.touchstart(e);}};d.prototype.ontouchmove=function(e){if(this._oMobifyCarousel){this._oMobifyCarousel.touchmove(e);}};d.prototype.ontouchend=function(e){if(this._oMobifyCarousel){if(this._oMobifyCarousel.hasActiveTransition()){this._oMobifyCarousel.onTransitionComplete();}this._oMobifyCarousel.touchend(e);}};d.prototype.onBeforeRendering=function(){var A=this.getActivePage();if(!A&&this.getPages().length>0){this.setAssociation("activePage",this.getPages()[0].getId(),true);}if(this._sResizeListenerId){R.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}return this;};d.prototype.onAfterRendering=function(){if(this._oMobifyCarousel){this._oMobifyCarousel.unbind();}this.$().carousel();this._oMobifyCarousel=this.getDomRef()._carousel;this._oMobifyCarousel.setLoop(this.getLoop());this._oMobifyCarousel.setRTL(sap.ui.getCore().getConfiguration().getRTL());var A=this.getActivePage();if(A){var i=this._getPageNumber(A);if(isNaN(i)||i==0){if(this.getPages().length>0){this.setAssociation("activePage",this.getPages()[0].getId(),true);this._adjustHUDVisibility(1);}}else{var o=sap.ui.getCore();if(o.isThemeApplied()){this._moveToPage(i+1);}else{o.attachThemeChanged(this._handleThemeLoad,this);}if(sap.zen&&sap.zen.commons&&this.getParent()instanceof sap.zen.commons.layout.PositionContainer){if(this._isCarouselUsedWithCommonsLayout===undefined){setTimeout(this["invalidate"].bind(this),0);this._isCarouselUsedWithCommonsLayout=true;}}}}this.$().on('afterSlide',q.proxy(function(e,f,n){if(e.target!==this.getDomRef()){return;}if(n>0){this._changePage(f,n);}},this));this._$InnerDiv=this.$().find(d._INNER_SELECTOR)[0];this._sResizeListenerId=R.register(this._$InnerDiv,this._fnAdjustAfterResize);this.$().find('.sapMCrslItemTableCell').focus(function(e){e.preventDefault();q(e.target).parents('.sapMCrsl').focus();return false;});var s='sap.m.IconTabBar';var p=this.getParent();while(p){if(p.getMetadata().getName()==s){var t=this;p.attachExpand(function(e){var E=e.getParameter('expand');if(E&&i>0){t._moveToPage(i+1);}});break;}p=p.getParent();}};d.prototype._handleThemeLoad=function(){var o,A=this.getActivePage();if(A){var i=this._getPageNumber(A);if(i>0){this._moveToPage(i+1);}}o=sap.ui.getCore();o.detachThemeChanged(this._handleThemeLoad,this);};d.prototype._moveToPage=function(i){this._oMobifyCarousel.changeAnimation('sapMCrslNoTransition');this._oMobifyCarousel.move(i);this._changePage(undefined,i);};d.prototype._changePage=function(o,n){this._adjustHUDVisibility(n);var O=this.getActivePage();if(o){O=this.getPages()[o-1].getId();}var N=this.getPages()[n-1].getId();this.setAssociation("activePage",N,true);var t=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("CAROUSEL_PAGE_INDICATOR_TEXT",[n,this.getPages().length]);L.debug("sap.m.Carousel: firing pageChanged event: old page: "+O+", new page: "+N);if(!D.system.desktop){q(document.activeElement).blur();}this.firePageChanged({oldActivePageId:O,newActivePageId:N});this.$('slide-number').text(t);};d.prototype._adjustHUDVisibility=function(n){if(D.system.desktop&&!this.getLoop()&&this.getPages().length>1){var h=this.$('hud');h.removeClass(d._LATERAL_CLASSES);if(n===1){h.addClass(d._LEFTMOST_CLASS);this._focusCarouselContainer(h,d._PREVIOUS_CLASS_ARROW);}else if(n===this.getPages().length){h.addClass(d._RIGHTMOST_CLASS);this._focusCarouselContainer(h,d._NEXT_CLASS_ARROW);}}};d.prototype._focusCarouselContainer=function(h,A){if(h.find('.'+A)[0]===document.activeElement){this.focus();}};d.prototype.setActivePage=function(p){var s=null;if(typeof(p)=='string'){s=p;}else if(p instanceof C){s=p.getId();}if(s){if(s===this.getActivePage()){return this;}var i=this._getPageNumber(s);if(!isNaN(i)){if(this._oMobifyCarousel){this._oMobifyCarousel.move(i+1);}}}this.setAssociation("activePage",s,true);return this;};d.prototype.setHeight=function(h){this.setProperty("height",h,true);this.$().css("height",h);return this;};d.prototype.setWidth=function(w){this.setProperty("width",w,true);this.$().css("width",w);return this;};d.prototype.setLoop=function(e){this.setProperty("loop",e,true);if(this._oMobifyCarousel){this._oMobifyCarousel.setLoop(e);}return this;};d.prototype._getNavigationArrow=function(n){var p={src:"sap-icon://slim-arrow-"+n,useIconTooltip:false};if(n==="left"){if(!this._oArrowLeft){this._oArrowLeft=I.getImageControl(this.getId()+"-arrowScrollLeft",this._oArrowLeft,this,p);}return this._oArrowLeft;}else if(n==="right"){if(!this._oArrowRight){this._oArrowRight=I.getImageControl(this.getId()+"-arrowScrollRight",this._oArrowRight,this,p);}return this._oArrowRight;}};d.prototype._createScrollContainer=function(p){var i;var s=D.system.desktop&&this.getArrowsPlacement()===b.PageIndicator;if(s){i="sapMCrslImg";}else{i="sapMCrslImgNoArrows";}var f=p instanceof sap.m.Image?"sapMCrslItemTableCell "+i:"sapMCrslItemTableCell",o=new sap.ui.core.HTML({content:"<div class='sapMCrslItemTable'>"+"<div class='"+f+"'></div>"+"</div>",afterRendering:function(e){var r=sap.ui.getCore().createRenderManager();r.render(p,this.getDomRef().firstChild);r.destroy();p=null;}});var S=new sap.m.ScrollContainer({horizontal:false,vertical:false,content:[o],width:'100%',height:'100%'});S.setParent(this,null,true);this._aScrollContainers.push(S);return S;};d.prototype.previous=function(){if(this._oMobifyCarousel){this._oMobifyCarousel.prev();}else{L.warning("Unable to execute sap.m.Carousel.previous: carousel must be rendered first.");}return this;};d.prototype.next=function(){if(this._oMobifyCarousel){this._oMobifyCarousel.next();}else{L.warning("Unable to execute sap.m.Carousel.next: carousel must be rendered first.");}return this;};d.prototype._getPageNumber=function(p){var i,r;for(i=0;i<this.getPages().length;i++){if(this.getPages()[i].getId()==p){r=i;break;}}return r;};d.prototype.onsaptabprevious=function(e){this._bDirection=false;this._fnOnTabPress(e);};d.prototype.onsaptabnext=function(e){this._bDirection=true;this._fnOnTabPress(e);};d.prototype.onfocusin=function(e){this.saveLastFocusReference(e);this._bDirection=undefined;};d.prototype.onsapskipforward=function(e){e.preventDefault();this._handleGroupNavigation(e,false);};d.prototype.onsapskipback=function(e){e.preventDefault();this._handleGroupNavigation(e,true);};d.prototype.onkeydown=function(e){if(e.keyCode==K.F7){this._handleF7Key(e);return;}if(e.target!=this.getDomRef()){return;}switch(e.keyCode){case 189:case K.NUMPAD_MINUS:this._fnSkipToIndex(e,-1);break;case K.PLUS:case K.NUMPAD_PLUS:this._fnSkipToIndex(e,1);break;}};d.prototype.onsapescape=function(e){var f;if(e.target===this.$()[0]&&this._lastActivePageNumber){f=this._lastActivePageNumber+1;this._oMobifyCarousel.move(f);this._changePage(undefined,f);}};d.prototype.onsapright=function(e){this._fnSkipToIndex(e,1);};d.prototype.onsapup=function(e){this._fnSkipToIndex(e,-1);};d.prototype.onsapleft=function(e){this._fnSkipToIndex(e,-1);};d.prototype.onsapdown=function(e){this._fnSkipToIndex(e,1);};d.prototype.onsaphome=function(e){this._fnSkipToIndex(e,0);};d.prototype.onsapend=function(e){this._fnSkipToIndex(e,this.getPages().length);};d.prototype.onsaprightmodifiers=function(e){if(e.ctrlKey){this._fnSkipToIndex(e,d._MODIFIERNUMBERFORKEYBOARDHANDLING);}};d.prototype.onsapupmodifiers=function(e){if(e.ctrlKey){this._fnSkipToIndex(e,d._MODIFIERNUMBERFORKEYBOARDHANDLING);}};d.prototype.onsappageup=function(e){this._fnSkipToIndex(e,d._MODIFIERNUMBERFORKEYBOARDHANDLING);};d.prototype.onsapleftmodifiers=function(e){if(e.ctrlKey){this._fnSkipToIndex(e,-d._MODIFIERNUMBERFORKEYBOARDHANDLING);}};d.prototype.onsapdownmodifiers=function(e){if(e.ctrlKey){this._fnSkipToIndex(e,-d._MODIFIERNUMBERFORKEYBOARDHANDLING);}};d.prototype.onsappagedown=function(e){this._fnSkipToIndex(e,-d._MODIFIERNUMBERFORKEYBOARDHANDLING);};d.prototype._fnOnTabPress=function(e){if(e.target===this.$()[0]){this._lastActivePageNumber=this._getPageNumber(this.getActivePage());}};d.prototype._handleGroupNavigation=function(e,s){var E=q.Event("keydown");e.preventDefault();this.$().focus();E.target=e.target;E.keyCode=K.F6;E.shiftKey=s;F.handleF6GroupNavigation(E);};d.prototype.saveLastFocusReference=function(e){if(this._bDirection===undefined){return;}if(this._lastFocusablePageElement===undefined){this._lastFocusablePageElement={};}this._lastFocusablePageElement[this.getActivePage()]=e.target;};d.prototype._getActivePageLastFocusedElement=function(){if(this._lastFocusablePageElement){return this._lastFocusablePageElement[this.getActivePage()];}};d.prototype._fnSkipToIndex=function(e,n){var f=n;if(e.target!==this.getDomRef()){return;}e.preventDefault();if(this._oMobifyCarousel.hasActiveTransition()){this._oMobifyCarousel.onTransitionComplete();}if(n!==0){f=this._getPageNumber(this.getActivePage())+1+n;}this._oMobifyCarousel.move(f);};d.prototype._handleF7Key=function(e){var A;e.preventDefault();A=this._getActivePageLastFocusedElement();if(e.target===this.$()[0]&&A){A.focus();}else{this.$().focus();}};d.prototype.setShowBusyIndicator=function(){L.warning("sap.m.Carousel: Deprecated function 'setShowBusyIndicator' called. Does nothing.");return this;};d.prototype.getShowBusyIndicator=function(){L.warning("sap.m.Carousel: Deprecated function 'getShowBusyIndicator' called. Does nothing.");return false;};d.prototype.setBusyIndicatorSize=function(s){if(!(s in B)){s=B.Medium;}return C.prototype.setBusyIndicatorSize.call(this,s);};return d;});
