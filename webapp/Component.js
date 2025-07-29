sap.ui.define([
    "sap/ui/core/UIComponent",
<<<<<<< HEAD
    "fioriapp/fioriapp/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("fioriapp.fioriapp.Component", {
=======
    "fioriapp/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("fioriapp.Component", {
>>>>>>> dfe6d4c3710caa4f4ac719f2794514941b2a7b7b
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
        }
    });
});