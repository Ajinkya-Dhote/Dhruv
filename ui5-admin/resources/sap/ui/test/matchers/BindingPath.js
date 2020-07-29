/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/test/matchers/Matcher'],function(M){"use strict";return M.extend("sap.ui.test.matchers.BindingPath",{metadata:{publicMethods:["isMatching"],properties:{path:{type:"string"},modelName:{type:"string"},propertyPath:{type:"string"}}},isMatching:function(c){var m=this.getModelName()||undefined;var p=this.getPropertyPath();var C=this.getPath();if(!C&&!p){this._oLogger.debug("Matcher requires context path or property path but none is defined! No controls will be matched");return false;}var b=true;var P=true;var o=c.mObjectBindingInfos&&c.mObjectBindingInfos[m];var B=c.getBindingContext(m);if(C){if(o){var s=_(C,m);b=o.path===s;this._oLogger.debug("Control '"+c+"'"+(b?" has":" does not have ")+" object binding with context path '"+s+"' for model '"+m+"'");}else{b=!!B&&B.getPath()===C;this._oLogger.debug("Control '"+c+"' "+(b?"has":"does not have")+" binding context with path '"+C+"' for model '"+m+"'");}}if(p){var a=_(p,m,B);var а=Object.keys(c.mBindingInfos).filter(function(d){var e=c.mBindingInfos[d];var f=e.parts?e.parts:[e];var g=f.filter(function(h){var i=h.path===a;var j=o||h.model===m;return i&&j;});return!!g.length;});P=!!а.length;this._oLogger.debug("Control '"+c+"' "+(P?"has":"does not have")+" binding property path '"+p+"' for model '"+m+"'");}return b&&P;}});function _(p,w,W){var P="/";var f=p;if(w||W){if(p.charAt(0)===P){f=p.substring(1);}}else if(p.charAt(0)!==P){f=P+p;}return f;}});
