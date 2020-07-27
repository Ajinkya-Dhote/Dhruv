/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/documentation/sdk/controller/util/JSDocUtil"],function(J){"use strict";return{crossLink:function(l){if(l[0]==="#"){l=document.location.href.substring(0,document.location.href.search("demoapps\.html"))+l;}return l;},libraryLink:function(n){if(n&&n.search("sap\\.")===0){return this.formatter.crossLink("#docs/api/symbols/"+n+".html");}else{return"";}},libraryLinkEnabled:function(n){return!!this.formatter.libraryLink.bind(this)(n);},categoryName:function(c){var r=this.getView().getModel("i18n").getResourceBundle();return r.getText("demoAppCategory"+c);},encodeModuleName:function(m){if(m){return encodeURIComponent(m);}},decodeModuleName:function(m){if(m){return decodeURIComponent(m);}},apiRefEntityName:function(o){if(o){return o.replace("module:","");}},apiRefAggregationAltTypes:function(a){return a&&a.join(", ");},formatVersionTitle:function(t){return t?"As of "+t:"Version N/A";},formatSenderLink:function(c,e,E){if(E==="methods"){return c+"#"+e;}if(E==="events"){return c+"#events:"+e;}if(E==="class"){return c;}return"";},formatIndexByVersionEntry:function(c,e,E,s,t){var T=this.formatSenderLink(c,e,E),h=this.formatApiHref(c,e,E,s),d=this.formatLinks(t);return'<a href="'+h+'" class="sapMLnk sapMLnkMaxWidth">'+T+'</a>'+d;},formatApiHref:function(c,e,E,s){var h;if(s){e=c+"."+e;}h="#/api/"+c;if(E!=="class"){h+="/"+E+"/"+e;}return h;},formatLinks:function(t){return J.formatTextBlock(t,{linkFormatter:function(a,b){var h;if(a.match("://")){return'<a target="_blank" href="'+a+'">'+(b||a)+'</a>';}a=a.trim().replace(/\.prototype\./g,"#");h=a.indexOf("#");b=b||a;if(h<0){var l=a.lastIndexOf("."),c=a.substring(0,l),m=a.substring(l+1),d=m;if(d){if(d.static===true){a=c+'/methods/'+c+'.'+m;}else{a=c+'/methods/'+m;}}}if(h===0){return"<code>"+a.slice(1)+"</code>";}if(h>0){a=a.slice(0,h)+'/methods/'+a.slice(h+1);}return"<a class=\"jsdoclink\" href=\"#/api/"+a+"\" target=\"_self\">"+b+"</a>";}});}};});
