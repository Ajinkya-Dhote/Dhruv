/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./Splitter','./SplitterRenderer',"sap/base/Log","sap/ui/thirdparty/jquery"],function(S,a,L,q){"use strict";var A=S.extend("sap.ui.layout.AssociativeSplitter",{metadata:{associations:{associatedContentAreas:{type:"sap.ui.core.Control",multiple:true,singularName:"associatedContentArea"}}},renderer:a});A.prototype.init=function(){S.prototype.init.call(this);this._keyListeners={increase:this._onKeyboardResize.bind(this,"inc",1),decrease:this._onKeyboardResize.bind(this,"dec",1),increaseMore:this._onKeyboardResize.bind(this,"incMore",2),decreaseMore:this._onKeyboardResize.bind(this,"decMore",2),max:this._onKeyboardResize.bind(this,"max",1),min:this._onKeyboardResize.bind(this,"min",1)};this._enableKeyboardListeners();};A.prototype._enableKeyboardListeners=function(){S.prototype._enableKeyboardListeners.call(this);this.onsaprightmodifiers=this._keyListeners.increase;this.onsapleftmodifiers=this._keyListeners.decrease;this.onsapupmodifiers=this._keyListeners.decrease;this.onsapdownmodifiers=this._keyListeners.increase;this.onsapright=this._keyListeners.increaseMore;this.onsapdown=this._keyListeners.increaseMore;this.onsapleft=this._keyListeners.decreaseMore;this.onsapup=this._keyListeners.decreaseMore;this.onsapend=this._keyListeners.max;this.onsaphome=this._keyListeners.min;this._keyboardEnabled=true;};A.prototype.addAssociatedContentArea=function(c){this._needsInvalidation=true;_(c);return this.addAssociation("associatedContentAreas",c);};A.prototype.indexOfAssociatedContentArea=function(c){var d=this._getContentAreas();for(var i=0;i<d.length;i++){if(c==d[i]){return i;}}return-1;};A.prototype.insertAssociatedContentArea=function(c,I){var d=c.getId();this._needsInvalidation=true;_(c);var e=this.getAssociatedContentAreas();for(var i=0;i<e.length;i++){if(e[i]===d){e.splice(i,1);}}e.splice(I,0,d);this.setAssociation("associatedContentAreas",null);var t=this;e.forEach(function(d){t.addAssociation("associatedContentAreas",d);});};A.prototype.removeAssociatedContentArea=function(c){this.removeAssociation("associatedContentAreas",c);};A.prototype._getContentAreas=function(){var c=this.getAssociatedContentAreas()||[];var C=this.getContentAreas();var v=c.map(function(i){return sap.ui.getCore().byId(i);}).filter(function(o){return o;});return C.concat(v);};A.prototype.onmousedown=function(j){if(this._ignoreMouse){return;}if(q(j.target).hasClass("sapUiLoSplitterBarIcon")){j.target=j.target.parentElement;}var i=this.getId();if(!j.target.id||j.target.id.indexOf(i+"-splitbar")!==0){return;}this._ignoreTouch=true;this._onBarMoveStart(j);this._oLastDOMclicked=j.target;};A.prototype.ondblclick=function(e){var i=this.getId(),B,c;if(!(e.target.contains(this._oLastDOMclicked)&&(this._oLastDOMclicked.id.indexOf(i+"-splitbar")>-1))){return;}B=parseInt(this._oLastDOMclicked.id.substr((i+"-splitbar-").length),10);c=this._getContentAreas()[B];c._currentPosition=this.getCalculatedSizes()[B];c._lastPosition=c._lastPosition||c._currentPosition;if(c._currentPosition===c._lastPosition){this._resizeContents(B,(this.getCalculatedSizes()[B])*-1,true);}else{this._resizeContents(B,c._lastPosition,true);c._lastPosition=null;}};A.prototype.ontouchstart=function(j){if(this._ignoreTouch){return;}if(q(j.target).hasClass("sapUiLoSplitterBarIcon")){j.target=j.target.parentElement;}var i=this.getId();if(!j.target.id||j.target.id.indexOf(i+"-splitbar")!==0){return;}if(!j.changedTouches||!j.changedTouches[0]){return;}this._ignoreMouse=true;this._onBarMoveStart(j.changedTouches[0],true);};A.prototype._onBarMoveStart=function(j,t){var I=this.getId();this.disableAutoResize(true);var p=j[this._moveCord];var s=parseInt(j.target.id.substr((I+"-splitbar-").length),10);var c=parseInt(j.target.parentElement.id.substr((I+"-splitbar-").length),10);var B=(s+1)?s:c;var $=q(j.target);if($.attr("class")==="sapUiLoSplitterBarIcon"){$=$.parent();}var C=this.getCalculatedSizes();var d=this._bHorizontal?$.innerWidth():$.innerHeight();var e=this._getContentAreas();var l=e[B].getLayoutData();var o=e[B+1].getLayoutData();if(!l.getResizable()||!o.getResizable()){b(t);return;}var r=0-d;for(var i=0;i<=B;++i){r+=C[i]+d;}this._move={start:p,relStart:r,barNum:B,bar:q(j.target),c1Size:C[B],c1MinSize:l?parseInt(l.getMinSize(),10):0,c2Size:C[B+1],c2MinSize:o?parseInt(o.getMinSize(),10):0};if(t){document.addEventListener("touchend",this._boundBarMoveEnd);document.addEventListener("touchmove",this._boundBarMove);}else{document.addEventListener("mouseup",this._boundBarMoveEnd);document.addEventListener("mousemove",this._boundBarMove);}this._$SplitterOverlay.css("display","block");this._$SplitterOverlay.appendTo(this.getDomRef());this._$SplitterOverlayBar.css(this._sizeDirNot,"");this._move["bar"].css("visibility","hidden");this._onBarMove(j);};A.prototype._resizeContents=function(l,p,f){var c,o,d,s,e,C,$,n,N,m,M,O,i,F,g,D,h=parseFloat(this._move.c1Size).toFixed(5),j=parseFloat(this._move.c2Size).toFixed(5),k=parseFloat(h),r=parseFloat(j);if(isNaN(p)){L.warning("Splitter: Received invalid resizing values - resize aborted.");return;}c=this._getContentAreas();o=c[l].getLayoutData();d=c[l+1].getLayoutData();s=o.getSize();e=d.getSize();C=this.$("content-"+l);$=this.$("content-"+(l+1));n=k+p;N=r-p;m=parseInt(o.getMinSize(),10);M=parseInt(d.getMinSize(),10);O=this.getOrientation();i=O==="Horizontal"?this.$().width():this.$().height();if(n<m){D=m-n;p+=D;n=m;N-=D;}else if(N<M){D=M-N;p-=D;N=M;n-=D;}if(f){if(s==="auto"&&e!=="auto"){g=this._pxToPercent(N,i);d.setSize(g);}else if(s!=="auto"&&e==="auto"){F=this._pxToPercent(n,i);o.setSize(F);}else{F=this._pxToPercent(n,i);g=this._pxToPercent(N,i);o.setSize(F);d.setSize(g);}}else{F=this._pxToPercent(n,i);g=this._pxToPercent(N,i);C.css(this._sizeType,F);$.css(this._sizeType,g);}};A.prototype._pxToPercent=function(p,f){return(p*100)/f+"%";};A.prototype._recalculateSizes=function(){var i,s,l,c,d,e,m;var f=[];var C=this._getContentAreas();var o=this.getOrientation();var g=[];var h=[];var p=[];for(i=0;i<C.length;++i){l=C[i].getLayoutData();s=l?l.getSize():"auto";f.push(s);}var j=this._calculateAvailableContentSize(f)+1;this._calculatedSizes=[];for(i=0;i<f.length;++i){s=f[i];if(s.indexOf("px")>-1){e=parseInt(s,10);j-=e;this._calculatedSizes[i]=e;}else if(s.indexOf("%")>-1){p.push(i);}else if(s==="auto"){l=C[i].getLayoutData();if(l&&parseInt(l.getMinSize(),10)!==0){h.push(i);}else{g.push(i);}}else{L.error("Illegal size value: "+f[i]);}}var w=false;if(j<0){w=true;j=0;}var r=j;j=o==="Horizontal"?this.$().width():this.$().height();var P=p.length;for(i=0;i<P;++i){d=p[i];if(P===1&&C.length===1){c=j;}else{c=parseFloat(f[d])/100*j;m=parseInt(C[d].getLayoutData().getMinSize(),10);if(c<m){c=m;}}this._calculatedSizes[d]=c;r-=c;}j=r;if(j<0){w=true;j=0;}c=Math.floor(j/(h.length+g.length),0);var k=h.length;for(i=0;i<k;++i){d=h[i];m=parseInt(C[d].getLayoutData().getMinSize(),10);if(m>c){this._calculatedSizes[d]=m;j-=m;}else{this._calculatedSizes[d]=c;j-=c;}}if(j<0){w=true;j=0;}r=j;var n=g.length;c=Math.floor(j/n,0);for(i=0;i<n;++i){d=g[i];this._calculatedSizes[d]=c;r-=c;}if(w){L.info("[Splitter] The set sizes and minimal sizes of the splitter contents are bigger "+"than the available space in the UI.");}this._calculatedSizes=this._calculatedSizes;};A.prototype._ensureAllSplittersCollapsed=function(B){var c=this._getContentAreas();var d=false;for(var i=0;i<c.length;i++){var s=c[i].getLayoutData().getSize().slice(0,-2);if(s==="0"||s==="au"){d=true;continue;}else if(i===(c.length-1)&&d){this._getContentAreas()[B+1].setLayoutData(new sap.ui.layout.SplitterLayoutData({size:"100%"}));}}};function _(c){var l=c.getLayoutData();if(l&&(!l.getResizable||!l.getSize||!l.getMinSize)){L.warning("Content \""+c.getId()+"\" for the Splitter contained wrong LayoutData. "+"The LayoutData has been replaced with default values.");l=null;}if(!l){c.setLayoutData(new sap.ui.layout.SplitterLayoutData());}}function b(t){var p=function(e){e.preventDefault();};var f=null;f=function(){document.removeEventListener("touchend",f);document.removeEventListener("touchmove",p);document.removeEventListener("mouseup",f);document.removeEventListener("mousemove",p);};if(t){this._ignoreMouse=true;document.addEventListener("touchend",f);document.addEventListener("touchmove",p);}else{document.addEventListener("mouseup",f);document.addEventListener("mousemove",p);}}return A;});
