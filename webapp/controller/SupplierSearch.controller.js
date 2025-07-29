sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("fioriapp.controller.SupplierSearch", {
        onInit: function () {
            this.initializeModels();
        },

        initializeModels: function () {
            // Initialize search model
            var oSearchModel = new sap.ui.model.json.JSONModel({
                category: "",
                location: "",
                budget: "",
                deliveryTime: ""
            });
            this.getView().setModel(oSearchModel, "search");

            // Initialize categories model
            var oCategoriesModel = new sap.ui.model.json.JSONModel([
                { key: "IT", name: "Information Technology" },
                { key: "OFFICE", name: "Office Supplies" },
                { key: "MANUFACTURING", name: "Manufacturing" },
                { key: "SERVICES", name: "Professional Services" },
                { key: "CONSTRUCTION", name: "Construction" }
            ]);
            this.getView().setModel(oCategoriesModel, "categories");

            // Initialize locations model
            var oLocationsModel = new sap.ui.model.json.JSONModel([
                { key: "LOCAL", name: "Local" },
                { key: "NATIONAL", name: "National" },
                { key: "INTERNATIONAL", name: "International" }
            ]);
            this.getView().setModel(oLocationsModel, "locations");

            // Initialize delivery times model
            var oDeliveryTimesModel = new sap.ui.model.json.JSONModel([
                { key: "IMMEDIATE", name: "Immediate" },
                { key: "1_WEEK", name: "1 Week" },
                { key: "2_WEEKS", name: "2 Weeks" },
                { key: "1_MONTH", name: "1 Month" },
                { key: "3_MONTHS", name: "3 Months" }
            ]);
            this.getView().setModel(oDeliveryTimesModel, "deliveryTimes");

            // Initialize suppliers model
            var oSuppliersModel = new sap.ui.model.json.JSONModel([]);
            this.getView().setModel(oSuppliersModel, "suppliers");

            // Initialize comparison model
            var oComparisonModel = new sap.ui.model.json.JSONModel({
                supplier1: {},
                supplier2: {},
                supplier3: {}
            });
            this.getView().setModel(oComparisonModel, "comparison");
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("Home");
        },

        onSearchSuppliers: function () {
            var oSearchModel = this.getView().getModel("search");
            var oSearchData = oSearchModel.getData();
            
            // Validate search criteria
            if (!oSearchData.category || !oSearchData.location) {
                MessageBox.error("Please select category and location");
                return;
            }

            // Simulate supplier search
            this.performSupplierSearch(oSearchData);
        },

        performSupplierSearch: function (oSearchData) {
            // Mock supplier data based on search criteria
            var aSuppliers = [
                {
                    name: "Tech Solutions Inc.",
                    type: "Technology",
                    rating: "4.5",
                    ratingState: "Success",
                    priceRange: "$1,000 - $5,000",
                    deliveryTime: "1 Week",
                    location: "Local",
                    certifications: "ISO 9001, ISO 27001"
                },
                {
                    name: "Global Supplies Co.",
                    type: "General",
                    rating: "4.2",
                    ratingState: "Success",
                    priceRange: "$500 - $2,000",
                    deliveryTime: "2 Weeks",
                    location: "National",
                    certifications: "ISO 9001"
                },
                {
                    name: "Premium Vendors Ltd.",
                    type: "Premium",
                    rating: "4.8",
                    ratingState: "Success",
                    priceRange: "$2,000 - $10,000",
                    deliveryTime: "Immediate",
                    location: "Local",
                    certifications: "ISO 9001, ISO 14001, OHSAS 18001"
                }
            ];

            var oSuppliersModel = this.getView().getModel("suppliers");
            oSuppliersModel.setData(aSuppliers);

            MessageToast.show("Found " + aSuppliers.length + " suppliers");
        },

        onClearSearch: function () {
            var oSearchModel = this.getView().getModel("search");
            oSearchModel.setData({
                category: "",
                location: "",
                budget: "",
                deliveryTime: ""
            });

            var oSuppliersModel = this.getView().getModel("suppliers");
            oSuppliersModel.setData([]);
        },

        onViewSupplierDetails: function (oEvent) {
            var oSource = oEvent.getSource();
            var oContext = oSource.getBindingContext("suppliers");
            var oSupplier = oContext.getObject();
            
            MessageBox.information("Supplier Details:\n\n" +
                "Name: " + oSupplier.name + "\n" +
                "Type: " + oSupplier.type + "\n" +
                "Rating: " + oSupplier.rating + "\n" +
                "Location: " + oSupplier.location + "\n" +
                "Certifications: " + oSupplier.certifications);
        },

        onSelectSupplier: function (oEvent) {
            var oSource = oEvent.getSource();
            var oContext = oSource.getBindingContext("suppliers");
            var oSupplier = oContext.getObject();
            
            MessageBox.confirm("Are you sure you want to select " + oSupplier.name + "?", {
                title: "Select Supplier",
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.OK) {
                        MessageToast.show("Supplier " + oSupplier.name + " selected");
                        this.getOwnerComponent().getRouter().navTo("Home");
                    }
                }.bind(this)
            });
        },

        onCompareSuppliers: function () {
            var oSuppliersModel = this.getView().getModel("suppliers");
            var aSuppliers = oSuppliersModel.getData();
            
            if (aSuppliers.length < 2) {
                MessageBox.error("Please select at least 2 suppliers to compare");
                return;
            }

            // Show comparison panel
            var oComparisonPanel = this.getView().byId("comparisonPanel");
            oComparisonPanel.setVisible(true);

            // Update comparison model
            var oComparisonModel = this.getView().getModel("comparison");
            oComparisonModel.setData({
                supplier1: aSuppliers[0] || {},
                supplier2: aSuppliers[1] || {},
                supplier3: aSuppliers[2] || {}
            });
        },

        onSelectBestSupplier: function () {
            var oComparisonModel = this.getView().getModel("comparison");
            var oData = oComparisonModel.getData();
            
            // Simple logic to select best supplier based on rating
            var bestSupplier = oData.supplier1;
            if (oData.supplier2 && parseFloat(oData.supplier2.rating) > parseFloat(bestSupplier.rating)) {
                bestSupplier = oData.supplier2;
            }
            if (oData.supplier3 && parseFloat(oData.supplier3.rating) > parseFloat(bestSupplier.rating)) {
                bestSupplier = oData.supplier3;
            }

            MessageToast.show("Best supplier selected: " + bestSupplier.name);
            this.getOwnerComponent().getRouter().navTo("Home");
        },

        onCloseComparison: function () {
            var oComparisonPanel = this.getView().byId("comparisonPanel");
            oComparisonPanel.setVisible(false);
        }
    });
}); 