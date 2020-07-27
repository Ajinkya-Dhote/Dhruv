/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/selectors/_BindingPath","sap/m/ListBase","sap/m/ListItemBase","sap/ui/thirdparty/jquery"],function(_,L,a,$){"use strict";var b=_.extend("sap.ui.test.selectors._TableRowItem",{_generate:function(c,t,r){if(t&&r){var R=this._findRow(c);var T=this._findTable(R);var o=T.getBinding("items");var s=R.getBindingContextPath&&R.getBindingContextPath();var m={};if(o&&s){m={bindingPath:{modelName:o.model||undefined,path:s},ancestor:t};}this._oLogger.debug("Control "+c+" has table row binding context path "+s);return $.extend({},r,{ancestor:m});}else{this._oLogger.debug("Control "+c+" does not have unique selector within row subtree or unique table selector");}},_getAncestors:function(c){var A={};var r=this._findRow(c);if(r){A.validation=r;var t=this._findTable(r);if(t){A.selector=t;return A;}}},_findRow:function(c){return this._findAncestor(c,function(c){return c instanceof a;});},_findTable:function(c){return this._findAncestor(c,function(c){return c instanceof L;});}});return b;});
