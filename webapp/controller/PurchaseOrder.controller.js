sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("fioriapp.controller.PurchaseOrder", {
        onInit: function () {
            this.initializeModels();
        },

        initializeModels: function () {
            // Initialize order model
            var oOrderModel = new sap.ui.model.json.JSONModel({
                orderNumber: "PO-" + new Date().getFullYear() + "-" + this.generateOrderNumber(),
                supplier: "Tech Solutions Inc.",
                orderDate: new Date(),
                deliveryDate: null,
                paymentTerms: "",
                shippingAddress: "",
                items: [],
                subtotal: 0,
                tax: 0,
                shipping: 0,
                total: 0,
                status: "Draft",
                statusState: "Warning",
                approvalStatus: "Pending",
                approvalState: "Warning",
                timeline: [
                    {
                        title: "Order Created",
                        text: "Purchase order has been created",
                        dateTime: new Date().toLocaleString(),
                        icon: "sap-icon://create",
                        state: "Success"
                    }
                ]
            });
            this.getView().setModel(oOrderModel, "order");

            // Initialize payment terms model
            var oPaymentTermsModel = new sap.ui.model.json.JSONModel([
                { key: "NET30", name: "Net 30 Days" },
                { key: "NET60", name: "Net 60 Days" },
                { key: "NET90", name: "Net 90 Days" },
                { key: "IMMEDIATE", name: "Immediate Payment" },
                { key: "ADVANCE", name: "Advance Payment" }
            ]);
            this.getView().setModel(oPaymentTermsModel, "paymentTerms");
        },

        generateOrderNumber: function () {
            return Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("Home");
        },

        onSaveDraft: function () {
            var oOrderModel = this.getView().getModel("order");
            var oData = oOrderModel.getData();
            
            // Validate required fields
            if (!this.validateOrder(oData)) {
                return;
            }

            // Update status
            oOrderModel.setProperty("/status", "Draft");
            oOrderModel.setProperty("/statusState", "Warning");

            // Add timeline entry
            this.addTimelineEntry("Order Saved", "Purchase order saved as draft", "sap-icon://save");

            MessageToast.show("Order saved as draft");
        },

        onSendToSupplier: function () {
            var oOrderModel = this.getView().getModel("order");
            var oData = oOrderModel.getData();
            
            // Validate required fields
            if (!this.validateOrder(oData)) {
                return;
            }

            MessageBox.confirm("Are you sure you want to send this order to the supplier?", {
                title: "Send to Supplier",
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        // Update status
                        oOrderModel.setProperty("/status", "Sent to Supplier");
                        oOrderModel.setProperty("/statusState", "Success");

                        // Add timeline entry
                        this.addTimelineEntry("Order Sent", "Purchase order sent to supplier", "sap-icon://send");

                        MessageToast.show("Order sent to supplier successfully");
                    }
                }.bind(this)
            });
        },

        onPrintOrder: function () {
            MessageToast.show("Printing purchase order...");
        },

        validateOrder: function (oData) {
            if (!oData.supplier || !oData.deliveryDate || !oData.paymentTerms || !oData.shippingAddress) {
                MessageBox.error("Please fill in all required fields");
                return false;
            }
            if (!oData.items || oData.items.length === 0) {
                MessageBox.error("Please add at least one item to the order");
                return false;
            }
            return true;
        },

        onAddOrderItem: function () {
            var oOrderModel = this.getView().getModel("order");
            var aItems = oOrderModel.getProperty("/items");
            
            aItems.push({
                name: "",
                description: "",
                quantity: "",
                unitPrice: "",
                total: ""
            });
            
            oOrderModel.setProperty("/items", aItems);
        },

        onDeleteOrderItem: function (oEvent) {
            var oSource = oEvent.getSource();
            var oContext = oSource.getBindingContext("order");
            var iIndex = oContext.getPath().split("/").pop();
            
            var oOrderModel = this.getView().getModel("order");
            var aItems = oOrderModel.getProperty("/items");
            
            aItems.splice(parseInt(iIndex), 1);
            oOrderModel.setProperty("/items", aItems);
            
            this.calculateTotals();
        },

        calculateTotals: function () {
            var oOrderModel = this.getView().getModel("order");
            var aItems = oOrderModel.getProperty("/items");
            
            var fSubtotal = 0;
            aItems.forEach(function(item) {
                if (item.quantity && item.unitPrice) {
                    var fTotal = parseFloat(item.quantity) * parseFloat(item.unitPrice);
                    item.total = fTotal.toFixed(2);
                    fSubtotal += fTotal;
                }
            });
            
            var fTax = fSubtotal * 0.1; // 10% tax
            var fShipping = 50; // Fixed shipping cost
            var fTotal = fSubtotal + fTax + fShipping;
            
            oOrderModel.setProperty("/subtotal", fSubtotal.toFixed(2));
            oOrderModel.setProperty("/tax", fTax.toFixed(2));
            oOrderModel.setProperty("/shipping", fShipping.toFixed(2));
            oOrderModel.setProperty("/total", fTotal.toFixed(2));
        },

        addTimelineEntry: function (sTitle, sText, sIcon) {
            var oOrderModel = this.getView().getModel("order");
            var aTimeline = oOrderModel.getProperty("/timeline");
            
            aTimeline.push({
                title: sTitle,
                text: sText,
                dateTime: new Date().toLocaleString(),
                icon: sIcon,
                state: "Success"
            });
            
            oOrderModel.setProperty("/timeline", aTimeline);
        }
    });
}); 