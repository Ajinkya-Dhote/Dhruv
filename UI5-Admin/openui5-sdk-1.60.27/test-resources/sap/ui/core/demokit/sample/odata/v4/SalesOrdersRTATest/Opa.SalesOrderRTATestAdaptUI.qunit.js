/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.require([
	"sap/ui/core/sample/odata/v4/SalesOrdersRTATest/tests/AdaptSalesOrdersTable",
	"sap/ui/test/opaQunit"
], function (AdaptSalesOrdersTable, opaTest) {
	/*global QUnit */
	"use strict";

	QUnit.module("sap.ui.core.sample.odata.v4.SalesOrdersRTATest - Adapt UI SalesOrdersTable");

	//*****************************************************************************
	opaTest("Adapt UI SalesOrdersTable", function (Given, When, Then) {

		AdaptSalesOrdersTable.adaptSalesOrdersTable(Given, When, Then,
			"sap.ui.core.sample.odata.v4.SalesOrdersRTATest");

	});
});
