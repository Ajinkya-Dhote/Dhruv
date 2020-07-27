/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.require([
	"sap/ui/test/opaQunit"
], function (opaTest) {
	/*global QUnit */
	"use strict";

	QUnit.module("sap.ui.core.sample.odata.v4.SalesOrdersTemplate");

	//*****************************************************************************
	opaTest("Start sales orders template app and check log", function (Given, When, Then) {
		When.onAnyPage.applySupportAssistant();
		Given.iStartMyUIComponent({
			autoWait : true,
			componentConfig : {
				name : "sap.ui.core.sample.odata.v4.SalesOrdersTemplate"
			}
		});

		When.onTheMainPage.pressValueHelpOnCurrencyCode();
		When.onTheMainPage.pressValueHelpOnRole();

		Then.onAnyPage.checkLog();
		Then.onAnyPage.analyzeSupportAssistant();
		Then.iTeardownMyUIComponent();
	});
});
