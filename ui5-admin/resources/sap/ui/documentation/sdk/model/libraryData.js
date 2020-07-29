/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery",'sap/ui/documentation/library',"sap/base/Log"],function(q,l,L){"use strict";function c(d,s,b){var e=[];if(q.isPlainObject(d.links)){e=Object.keys(d.links).map(function(k){return{name:k,ref:d.links[k]};});}var A={lib:d.namespace||b,name:d.text,icon:d.icon,desc:d.desc,config:d.config,teaser:d.teaser,category:d.category,ref:(d.resolve==="lib"?s:"")+d.ref,links:e};return A;}function a(b,d){var C=["Showcase","Tutorial","Template","RTA","Misc"];var D={};C.forEach(function(s){D[s]=[];});var o={demoApps:[],demoAppsByCategory:[]};for(var i=0;i<b.length;i++){var e=d[b[i]].demo;if(!e){continue;}if(e.links&&e.links.length>0){for(var j=0;j<e.links.length;j++){var f=c(e.links[j],d[b[i]].libraryUrl,e.text);o.demoApps.push(f);if(C.indexOf(f.category)<0){L.warning("Demo app category \""+f.category+"\" not found, correcting demo app \""+f.name+"\" to \"Misc\"");f.category="Misc";}if(e.links[j].category!=="Tool"){D[f.category].push(f);}}}}Object.keys(D).forEach(function(k){if(D[k].length===0){return;}var r=[];var g=r.push([]);var h=0;for(var i=0;i<D[k].length;i++){h++;if(D[k][i].teaser){h++;}if(h>4){g=r.push([]);h=0;}r[g-1].push(D[k][i]);}o.demoAppsByCategory.push({categoryId:k,rows:r});});return o;}return{fillJSONModel:function(m){function h(b,d){m.setProperty("/bFooterVisible",true);if(!b){return;}var M=m.getData();m.setData(q.extend(M,a(b,d)));}m.setProperty("/bFooterVisible",false);l._loadAllLibInfo("","_getDocuIndex",h);}};});
