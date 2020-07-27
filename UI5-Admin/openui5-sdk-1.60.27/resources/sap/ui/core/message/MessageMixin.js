/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/base/Log"],function(l,L){"use strict";var V=l.ValueState;var M=function(){this.refreshDataState=r;this.fnDestroy=this.destroy;this.destroy=d;};function r(n,D){if(D.getChanges().messages){var m=D.getMessages();var a=sap.ui.core.LabelEnablement.getReferencingLabels(this);var s=a[0];var f=false;m.forEach(function(b){if(a&&a.length>0){var c=sap.ui.getCore().byId(s);if(c.getMetadata().isInstanceOf("sap.ui.core.Label")&&c.getText&&b.getAdditionalText()!==c.getText()){b.setAdditionalText(c.getText());f=true;}else{L.warning("sap.ui.core.message.Message: Can't create labelText."+"Label with id "+s+" is no valid sap.ui.core.Label.",this);}}if(b.getControlId()!==this.getId()){b.addControlId(this.getId());f=true;}}.bind(this));var o=sap.ui.getCore().getMessageManager().getMessageModel();o.checkUpdate(f,true);if(m&&m.length>0){var b=m[0];if(V[b.type]){this.setValueState(b.type);this.setValueStateText(b.message);}}else{this.setValueState(V.None);this.setValueStateText('');}}}function d(){var c=this.getId();function a(o){o.removeControlId(c);}for(var n in this.mBindingInfos){var b=this.mBindingInfos[n];if(b.binding){var D=b.binding.getDataState();var m=D.getMessages();m.forEach(a);}}this.fnDestroy.apply(this,arguments);}return M;},true);
