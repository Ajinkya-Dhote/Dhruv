/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.require([
	"sap/ui/core/sample/odata/v4/SalesOrders/tests/MessageHandling",
	"sap/ui/test/opaQunit"
], function (MessageHandling, opaTest) {
	/*global QUnit */
	"use strict";

	QUnit.module("sap.ui.core.sample.odata.v4.SalesOrders - Message Handling");

	//*****************************************************************************
	opaTest("Message Handling", function (Given, When, Then) {

		MessageHandling.checkMessages(Given, When, Then);

	});
});