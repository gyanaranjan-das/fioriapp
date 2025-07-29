sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("fioriapp.controller.InvoiceProcessing", {
        onInit: function () {
            this.initializeModels();
        },

        initializeModels: function () {
            // Initialize invoice model
            var oInvoiceModel = new sap.ui.model.json.JSONModel({
                invoiceNumber: "",
                supplier: "Tech Solutions Inc.",
                invoiceDate: new Date(),
                dueDate: null,
                amount: "",
                currency: "USD",
                items: []
            });
            this.getView().setModel(oInvoiceModel, "invoice");

            // Initialize currencies model
            var oCurrenciesModel = new sap.ui.model.json.JSONModel([
                { key: "USD", name: "US Dollar" },
                { key: "EUR", name: "Euro" },
                { key: "GBP", name: "British Pound" },
                { key: "JPY", name: "Japanese Yen" }
            ]);
            this.getView().setModel(oCurrenciesModel, "currencies");

            // Initialize matching model
            var oMatchingModel = new sap.ui.model.json.JSONModel({
                po: {
                    status: "Matched",
                    statusState: "Success"
                },
                invoice: {
                    status: "Under Review",
                    statusState: "Warning"
                },
                receipt: {
                    status: "Received",
                    statusState: "Success"
                },
                result: "Three-Way Match Successful",
                resultState: "Success",
                message: "All documents match. Invoice can be approved for payment."
            });
            this.getView().setModel(oMatchingModel, "matching");
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("Home");
        },

        onAddInvoiceItem: function () {
            var oInvoiceModel = this.getView().getModel("invoice");
            var aItems = oInvoiceModel.getProperty("/items");
            
            aItems.push({
                name: "",
                description: "",
                quantity: "",
                unitPrice: "",
                total: "",
                matchStatus: "Pending",
                matchState: "Warning"
            });
            
            oInvoiceModel.setProperty("/items", aItems);
        },

        onDeleteInvoiceItem: function (oEvent) {
            var oSource = oEvent.getSource();
            var oContext = oSource.getBindingContext("invoice");
            var iIndex = oContext.getPath().split("/").pop();
            
            var oInvoiceModel = this.getView().getModel("invoice");
            var aItems = oInvoiceModel.getProperty("/items");
            
            aItems.splice(parseInt(iIndex), 1);
            oInvoiceModel.setProperty("/items", aItems);
        },

        onRejectInvoice: function () {
            MessageBox.confirm("Are you sure you want to reject this invoice?", {
                title: "Reject Invoice",
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        // Update matching status
                        var oMatchingModel = this.getView().getModel("matching");
                        oMatchingModel.setProperty("/result", "Invoice Rejected");
                        oMatchingModel.setProperty("/resultState", "Error");
                        oMatchingModel.setProperty("/message", "Invoice has been rejected. Please contact supplier for clarification.");

                        MessageToast.show("Invoice rejected successfully");
                    }
                }.bind(this)
            });
        },

        onApproveInvoice: function () {
            var oInvoiceModel = this.getView().getModel("invoice");
            var oData = oInvoiceModel.getData();
            
            // Validate invoice
            if (!this.validateInvoice(oData)) {
                return;
            }

            MessageBox.confirm("Are you sure you want to approve this invoice for payment?", {
                title: "Approve Invoice",
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        // Update matching status
                        var oMatchingModel = this.getView().getModel("matching");
                        oMatchingModel.setProperty("/result", "Invoice Approved");
                        oMatchingModel.setProperty("/resultState", "Success");
                        oMatchingModel.setProperty("/message", "Invoice approved for payment processing.");

                        // Update invoice status
                        oMatchingModel.setProperty("/invoice/status", "Approved");
                        oMatchingModel.setProperty("/invoice/statusState", "Success");

                        MessageToast.show("Invoice approved successfully");
                    }
                }.bind(this)
            });
        },

        onHoldInvoice: function () {
            MessageBox.confirm("Are you sure you want to hold this invoice for review?", {
                title: "Hold Invoice",
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        // Update matching status
                        var oMatchingModel = this.getView().getModel("matching");
                        oMatchingModel.setProperty("/result", "Invoice On Hold");
                        oMatchingModel.setProperty("/resultState", "Warning");
                        oMatchingModel.setProperty("/message", "Invoice is on hold pending further review.");

                        MessageToast.show("Invoice placed on hold");
                    }
                }.bind(this)
            });
        },

        validateInvoice: function (oData) {
            if (!oData.invoiceNumber || !oData.invoiceDate || !oData.dueDate || !oData.amount) {
                MessageBox.error("Please fill in all required invoice fields");
                return false;
            }
            if (!oData.items || oData.items.length === 0) {
                MessageBox.error("Please add at least one item to the invoice");
                return false;
            }
            return true;
        },

        performThreeWayMatching: function () {
            var oMatchingModel = this.getView().getModel("matching");
            var oInvoiceModel = this.getView().getModel("invoice");
            var oInvoiceData = oInvoiceModel.getData();
            
            // Simulate three-way matching logic
            if (oInvoiceData.invoiceNumber && oInvoiceData.amount) {
                // Check if PO exists and matches
                var bPOMatch = true; // Mock PO match
                
                // Check if goods receipt exists
                var bReceiptMatch = true; // Mock receipt match
                
                // Check if invoice amounts match
                var bAmountMatch = true; // Mock amount match
                
                if (bPOMatch && bReceiptMatch && bAmountMatch) {
                    oMatchingModel.setProperty("/result", "Three-Way Match Successful");
                    oMatchingModel.setProperty("/resultState", "Success");
                    oMatchingModel.setProperty("/message", "All documents match. Invoice can be approved for payment.");
                } else {
                    oMatchingModel.setProperty("/result", "Three-Way Match Failed");
                    oMatchingModel.setProperty("/resultState", "Error");
                    oMatchingModel.setProperty("/message", "Document mismatch detected. Please review before approval.");
                }
            }
        }
    });
}); 