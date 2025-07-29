sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("fioriapp.controller.Requisition", {
        onInit: function () {
            this.initializeModels();
        },

        initializeModels: function () {
            // Initialize requisition model
            var oRequisitionModel = new sap.ui.model.json.JSONModel({
                title: "",
                department: "",
                priority: "",
                requiredDate: null,
                budget: "",
                description: "",
                items: []
            });
            this.getView().setModel(oRequisitionModel, "requisition");

            // Initialize departments model
            var oDepartmentsModel = new sap.ui.model.json.JSONModel([
                { key: "IT", name: "Information Technology" },
                { key: "HR", name: "Human Resources" },
                { key: "FIN", name: "Finance" },
                { key: "OPS", name: "Operations" },
                { key: "MKT", name: "Marketing" }
            ]);
            this.getView().setModel(oDepartmentsModel, "departments");

            // Initialize priorities model
            var oPrioritiesModel = new sap.ui.model.json.JSONModel([
                { key: "LOW", name: "Low" },
                { key: "MEDIUM", name: "Medium" },
                { key: "HIGH", name: "High" },
                { key: "URGENT", name: "Urgent" }
            ]);
            this.getView().setModel(oPrioritiesModel, "priorities");
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("Home");
        },

        onSaveDraft: function () {
            var oRequisitionModel = this.getView().getModel("requisition");
            var oData = oRequisitionModel.getData();
            
            // Validate required fields
            if (!this.validateRequisition(oData)) {
                return;
            }

            // Save draft logic
            MessageToast.show("Draft saved successfully");
        },

        onSubmitApproval: function () {
            var oRequisitionModel = this.getView().getModel("requisition");
            var oData = oRequisitionModel.getData();
            
            // Validate required fields
            if (!this.validateRequisition(oData)) {
                return;
            }

            // Submit for approval logic
            MessageBox.confirm("Are you sure you want to submit this requisition for approval?", {
                title: "Submit for Approval",
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        MessageToast.show("Requisition submitted for approval");
                        this.getOwnerComponent().getRouter().navTo("Home");
                    }
                }.bind(this)
            });
        },

        validateRequisition: function (oData) {
            if (!oData.title || !oData.department || !oData.priority || !oData.requiredDate || !oData.budget || !oData.description) {
                MessageBox.error("Please fill in all required fields");
                return false;
            }
            return true;
        },

        onAddItem: function () {
            var oRequisitionModel = this.getView().getModel("requisition");
            var aItems = oRequisitionModel.getProperty("/items");
            
            aItems.push({
                name: "",
                quantity: "",
                unitPrice: "",
                total: ""
            });
            
            oRequisitionModel.setProperty("/items", aItems);
        },

        onDeleteItem: function (oEvent) {
            var oSource = oEvent.getSource();
            var oContext = oSource.getBindingContext("requisition");
            var iIndex = oContext.getPath().split("/").pop();
            
            var oRequisitionModel = this.getView().getModel("requisition");
            var aItems = oRequisitionModel.getProperty("/items");
            
            aItems.splice(parseInt(iIndex), 1);
            oRequisitionModel.setProperty("/items", aItems);
        }
    });
}); 