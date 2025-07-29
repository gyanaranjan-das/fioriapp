/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
<<<<<<< HEAD
		"fioriapp/fioriapp/test/unit/AllTests"
=======
		"fioriapp/test/unit/AllTests"
>>>>>>> dfe6d4c3710caa4f4ac719f2794514941b2a7b7b
	], function () {
		QUnit.start();
	});
});
