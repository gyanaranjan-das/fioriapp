sap.ui.define([
	"sap/ui/test/Opa5",
	"./arrangements/Startup",
	"./NavigationJourney"
], function (Opa5, Startup) {
	"use strict";

	Opa5.extendConfig({
		arrangements: new Startup(),
<<<<<<< HEAD
		viewNamespace: "fioriapp.fioriapp.view.",
=======
		viewNamespace: "fioriapp.view.",
>>>>>>> dfe6d4c3710caa4f4ac719f2794514941b2a7b7b
		autoWait: true
	});
});
