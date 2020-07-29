/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","../UIArea","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/control"],function(D,U,q){"use strict";var a={},d=null,o=null,v=null,V=[],b=[],c=null,$,e,g,C,t;function f(E,S){if(!E){return;}if(E.addStyleClass){E.addStyleClass(S);}else{E.$().addClass(S);}}function r(E,S){if(!E){return;}if(E.removeStyleClass){E.removeStyleClass(S);}else{E.$().removeClass(S);}}function h(E,i){var z=q(E.target).control(0,true);if(!z){return;}var N=q.Event(null,E);N.type=i;z.getUIArea()._handleEvent(N);}function s(d,E){if(D.browser.msie||!d||!d.getDragGhost){return;}var i=d.getDragGhost();if(!i){return;}if(!g){g=q('<div class="sapUiDnDGhostContainer"></div>');q(document.body).append(g);}g.append(i);window.setTimeout(function(){g.empty();},0);var O=E.originalEvent;O.dataTransfer.setDragImage(i,O.offsetX,O.offsetY);}function j(E){var i={},I,z=E.originalEvent.dataTransfer,A=function(T,B){if(z&&T=="text"||(D.browser!="msie"&&D.browser!="edge")){z.setData(T,B);}};return{setData:function(K,B){B=""+B;i[K]=B;A(K,B);},getData:function(K){return i[K];},setTextData:function(B){B=""+B;i["text/plain"]=B;i["text"]=B;A("text/plain",B);A("text",B);},getTextData:function(){return i["text/plain"];},setComplexData:function(K,B){i[K]=B;},getComplexData:function(K){return i[K];},getIndicator:function(){return $&&$[0];},setIndicatorConfig:function(B){I=B;},getIndicatorConfig:function(B){return I;},getDragControl:function(){return d;},getDropControl:function(){return v;},setDropControl:function(B){v=B;},getDropInfo:function(){return b[0]||null;},getDropPosition:function(){return C;}};}function k(E){m();r(d,"sapUiDnDDragging");d=o=v=c=null;C="";V=[];b=[];}function l(){if($){return $;}if(!D.browser.msie){e=q("<div class='sapUiDnDIndicatorWrapper'></div>");}$=q("<div class='sapUiDnDIndicator'></div>");if(!e){q(sap.ui.getCore().getStaticAreaRef()).append($);}else{q(sap.ui.getCore().getStaticAreaRef()).append(e);$.appendTo(e);}return $;}function m(){if($){$.removeAttr("style").hide();}}function n(E,i,z,A){if(!i){return;}var I=E.dragSession&&E.dragSession.getIndicatorConfig(),B=i.getBoundingClientRect(),P=window.pageYOffset,F=window.pageXOffset,G=l(),R,S={},H={top:B.top+P,bottom:B.bottom+P,left:B.left+F,right:B.right+F,width:B.width,height:B.height};if(!z||z=="On"){R="On";A="";}else if(A=="Horizontal"){var J=E.pageX-H.left;S.height=H.height;S.top=H.top;if(z=="Between"){S.width="";if(J<H.width*0.5){R="Before";S.left=H.left;}else{R="After";S.left=H.right;}}else if(z=="OnOrBetween"){if(J<H.width*0.25){R="Before";S.left=H.left;S.width="";}else if(J>H.width*0.75){R="After";S.left=H.right;S.width="";}else{R="On";}}}else{var K=E.pageY-H.top;S.width=H.width;S.left=H.left;if(z=="Between"){S.height="";if(K<H.height*0.5){R="Before";S.top=H.top;}else{R="After";S.top=H.bottom;}}else if(z=="OnOrBetween"){if(K<H.height*0.25){R="Before";S.top=H.top;S.height="";}else if(K>H.height*0.75){R="After";S.top=H.bottom;S.height="";}else{R="On";}}}if(I&&I.display=="none"){return R;}if(R=="On"){S.top=H.top;S.left=H.left;S.width=H.width;S.height=H.height;z=R;}else{z="Between";}G.attr("data-drop-layout",A);G.attr("data-drop-position",z);G.css(q.extend(S,I)).show();return R;}function p(i){var P=i.getParent(),S=(i.getDragDropConfig)?i.getDragDropConfig():[],z=(P&&P.getDragDropConfig)?P.getDragDropConfig():[];return S.concat(z);}function u(d){var i=p(d);return i.filter(function(z){return z.isDraggable(d);});}function w(o,i,E){var z=p(o);i=i||[];return z.filter(function(A){return!A.isA("sap.ui.core.dnd.IDragInfo");}).concat(i).filter(function(A){if(!A.isDroppable(o,E)){return false;}var B=A.getGroupName();if(!B){return true;}return i.some(function(F){return F.getGroupName()==B;});});}function x(E,i){E.preventDefault();var z=i.getDropEffect().toLowerCase();E.originalEvent.dataTransfer.dropEffect=z;}function y(E,i,v){var T=i.getTargetAggregation();if(!T){return n(E,v.getDomRef());}var z;if(E.getMark("DragWithin")==T){z=v.getDomRefForSetting(T);}z=z||v.getDomRef();return n(E,z,i.getDropPosition(true),i.getDropLayout(true));}a.preprocessEvent=function(E){if(c&&E.type.indexOf("dr")==0){E.dragSession=c;}var i="onbefore"+E.type;if(a[i]){a[i](E);}};a.postprocessEvent=function(E){var i="onafter"+E.type;if(a[i]){a[i](E);}};a.onbeforedragstart=function(E){if(!E.target.draggable){return;}if(/^(input|textarea)$/i.test(document.activeElement.tagName)){E.target.getAttribute("data-sap-ui-draggable")&&E.preventDefault();return;}d=q(E.target).control(0,true);if(!d){return;}V=u(d);if(!V.length){return;}if(D.browser.firefox&&E.originalEvent.dataTransfer.types.length===0){E.originalEvent.dataTransfer.setData("ui5/dummyDataForFirefox","data");}E.dragSession=c=j(E);};a.onafterdragstart=function(E){if(!V.length||E.isDefaultPrevented()){k();return;}V=E.isMarked("NonDraggable")?[]:V.filter(function(i){return i.fireDragStart(E);});if(!V.length){E.preventDefault();k();return;}s(d,E);f(d,"sapUiDnDDragging");};a.onbeforedragenter=function(E){var z=q(E.target).control(0,true);if(z&&o===z){E.setMark("DragWithin","SameControl");}else{t=Date.now();o=z;}var A=[];v=z;for(var i=0;i<20&&v;i++,v=v.getParent()){A=w(v,V,E);if(A.length){break;}}if(E.getMark("DragWithin")!="SameControl"){b=A;if(c){c.setIndicatorConfig(null);}}if(!b.length){v=null;}else if(!c){E.dragSession=c=j(E);}};a.onafterdragenter=function(E){if(!v||E.isMarked("NonDroppable")){b=[];}else if(E.getMark("DragWithin")!="SameControl"){b=b.filter(function(z){return z.fireDragEnter(E);});}var i=b[0];if(!i||i.getDropEffect()=="None"){m();C="";}else{x(E,i);C=y(E,i,v);}};a.onbeforedragover=function(E){var i=Date.now();if(i-t>=1000){h(E,"longdragover");t=i;}};a.onafterdragover=function(E){var i=b[0];if(!i||i.getDropEffect()=="None"){return;}b.forEach(function(z){z.fireDragOver(E);});x(E,i);if(i&&i.getDropPosition(true)=="On"){return;}C=y(E,i,v);};a.onbeforedrop=function(E){if(b.length){E.preventDefault();}};a.onafterdrop=function(E){b.forEach(function(i){i.fireDrop(E);});this.iDragEndTimer=window.requestAnimationFrame(this.onafterdragend.bind(this,E));};a.onafterdragend=function(E){this.iDragEndTimer=window.cancelAnimationFrame(this.iDragEndTimer);V.forEach(function(i){i.fireDragEnd(E);});k();};U.addEventPreprocessor(a.preprocessEvent);U.addEventPostprocessor(a.postprocessEvent);return a;},true);
