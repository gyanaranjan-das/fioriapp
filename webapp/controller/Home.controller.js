sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("fioriapp.controller.Home", {
        onInit: function() {
            // Initialize dashboard data
            var oDashboardData = {
                user: {
                    name: "John Doe",
                    role: "Procurement Manager"
                },
                stats: {
                    totalOrders: 156,
                    pendingApprovals: 23,
                    activeSuppliers: 45,
                    monthlySpend: "€2.4M"
                },
                recentActivities: [
                    {
                        id: 1,
                        type: "Purchase Order",
                        description: "PO-2024-001 created for Office Supplies",
                        status: "Pending",
                        date: "2024-01-15",
                        amount: "€1,250"
                    },
                    {
                        id: 2,
                        type: "Supplier Evaluation",
                        description: "TechCorp Ltd. evaluation completed",
                        status: "Approved",
                        date: "2024-01-14",
                        amount: "€15,000"
                    },
                    {
                        id: 3,
                        type: "Invoice Processing",
                        description: "INV-2024-045 processed successfully",
                        status: "Paid",
                        date: "2024-01-13",
                        amount: "€3,750"
                    }
                ]
            };

            var oModel = new JSONModel(oDashboardData);
            this.getView().setModel(oModel, "dashboard");
        },

        onTilePress: function(oEvent) {
            var sTileId = oEvent.getSource().getId();
            var sMessage = "";

            switch(sTileId.split("--")[1]) {
                case "tileRequisition":
<<<<<<< HEAD
                    this.getOwnerComponent().getRouter().navTo("Requisition");
                    break;
                case "tileSupplierSearch":
                    this.getOwnerComponent().getRouter().navTo("SupplierSearch");
=======
                    sMessage = "Opening Requirement Identification module...";
                    this._showProcessDialog("Requirement Identification", "Create and manage purchase requests");
                    break;
                case "tileSupplierSearch":
                    sMessage = "Opening Supplier Search module...";
                    this._showProcessDialog("Supplier Search", "Find and evaluate potential vendors");
>>>>>>> dfe6d4c3710caa4f4ac719f2794514941b2a7b7b
                    break;
                case "tileSupplierEvaluation":
                    sMessage = "Opening Supplier Evaluation module...";
                    this._showProcessDialog("Supplier Evaluation", "Assess vendor capabilities and performance");
                    break;
                case "tilePurchaseOrder":
<<<<<<< HEAD
                    this.getOwnerComponent().getRouter().navTo("PurchaseOrder");
=======
                    sMessage = "Opening Purchase Order module...";
                    this._showProcessDialog("Purchase Order", "Create and manage purchase orders");
>>>>>>> dfe6d4c3710caa4f4ac719f2794514941b2a7b7b
                    break;
                case "tileOrderAck":
                    sMessage = "Opening Order Acknowledgement module...";
                    this._showProcessDialog("Order Acknowledgement", "Track vendor order confirmations");
                    break;
                case "tileDeliveryInspection":
                    sMessage = "Opening Delivery & Inspection module...";
                    this._showProcessDialog("Delivery & Inspection", "Manage goods receipt and quality checks");
                    break;
                case "tileInvoiceProcessing":
<<<<<<< HEAD
                    this.getOwnerComponent().getRouter().navTo("InvoiceProcessing");
=======
                    sMessage = "Opening Invoice Processing module...";
                    this._showProcessDialog("Invoice Processing", "Process and verify vendor invoices");
>>>>>>> dfe6d4c3710caa4f4ac719f2794514941b2a7b7b
                    break;
                case "tilePaymentProcessing":
                    sMessage = "Opening Payment Processing module...";
                    this._showProcessDialog("Payment Processing", "Complete payments to vendors");
                    break;
                default:
                    sMessage = "Module not implemented yet";
<<<<<<< HEAD
                    MessageToast.show(sMessage);
            }
=======
            }

            MessageToast.show(sMessage);
>>>>>>> dfe6d4c3710caa4f4ac719f2794514941b2a7b7b
        },

        _showProcessDialog: function(sTitle, sDescription) {
            if (!this._oProcessDialog) {
                this._oProcessDialog = new sap.m.Dialog({
                    title: sTitle,
                    contentWidth: "500px",
                    contentHeight: "300px",
                    resizable: true,
                    draggable: true,
                    content: [
                        new sap.m.VBox({
                            items: [
                                new sap.m.Text({
                                    text: sDescription
                                }).addStyleClass("sapUiMediumMarginTop"),
                                new sap.m.Text({
                                    text: "This module would contain:"
                                }).addStyleClass("sapUiMediumMarginTop"),
                                new sap.m.List({
                                    items: [
                                        new sap.m.StandardListItem({ title: "Data entry forms" }),
                                        new sap.m.StandardListItem({ title: "Approval workflows" }),
                                        new sap.m.StandardListItem({ title: "Document management" }),
                                        new sap.m.StandardListItem({ title: "Reporting capabilities" })
                                    ]
                                })
                            ]
                        }).addStyleClass("sapUiMediumMargin")
                    ],
                    beginButton: new sap.m.Button({
                        text: "Close",
                        press: function() {
                            this._oProcessDialog.close();
                        }.bind(this)
                    })
                });
            }

            this._oProcessDialog.setTitle(sTitle);
            this._oProcessDialog.getContent()[0].getItems()[0].setText(sDescription);
            this._oProcessDialog.open();
        },

        onLogout: function() {
            MessageToast.show("Logging out...");
            this.getOwnerComponent().getRouter().navTo("Login");
        },

        onUserMenuPress: function() {
            MessageToast.show("User menu opened");
        }
    });
});