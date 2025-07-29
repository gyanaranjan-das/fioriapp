sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
    "use strict";

    return Controller.extend("fioriapp.controller.Login", {
        onInit: function() {
            // Initialize login model
            var oLoginModel = new JSONModel({
                username: "",
                password: "",
                rememberMe: false,
                isLoading: false
            });
            this.getView().setModel(oLoginModel, "login");
        },

        onLogin: function () {
            var oModel = this.getView().getModel("login");
            var sUsername = this.byId("usernamelogin").getValue();
            var sPassword = this.byId("passwordlogin").getValue();
            
            if (!sUsername || !sPassword) {
                MessageToast.show("Please enter both username and password");
                return;
            }

            // Set loading state
            oModel.setProperty("/isLoading", true);
            this.byId("loginButton").setEnabled(false);

            // Simulate authentication delay
            setTimeout(() => {
                // Simple authentication logic (in real app, this would be server-side)
                if (this._validateCredentials(sUsername, sPassword)) {
                    MessageToast.show("Welcome, " + sUsername + "!");
                    
                    // Store user session
                    this._setUserSession(sUsername);
                    
                    // Navigate to Home
                    this.getOwnerComponent().getRouter().navTo("Home");
                } else {
                    MessageToast.show("Invalid credentials. Try: admin/admin or user/user");
                }

                // Reset loading state
                oModel.setProperty("/isLoading", false);
                this.byId("loginButton").setEnabled(true);
            }, 1000);
        },

        _validateCredentials: function(sUsername, sPassword) {
            // Demo credentials
            var aValidCredentials = [
                { username: "admin", password: "admin" },
                { username: "user", password: "user" },
                { username: "manager", password: "manager" },
                { username: "demo", password: "demo" }
            ];

            return aValidCredentials.some(function(cred) {
                return cred.username === sUsername && cred.password === sPassword;
            });
        },

        _setUserSession: function(sUsername) {
            // Store user info in local storage (in real app, use proper session management)
            var oUserData = {
                username: sUsername,
                loginTime: new Date().toISOString(),
                role: sUsername === "admin" ? "Administrator" : "User"
            };
            localStorage.setItem("userSession", JSON.stringify(oUserData));
        },

        onNavigateToSignup: function () {
            this.getOwnerComponent().getRouter().navTo("Signup");
        },

        onForgotPassword: function() {
            MessageToast.show("Password reset functionality would be implemented here");
        },

        onUsernameChange: function() {
            this._clearValidationErrors();
        },

        onPasswordChange: function() {
            this._clearValidationErrors();
        },

        _clearValidationErrors: function() {
            // Clear any validation error states
            this.byId("usernamelogin").setValueState("None");
            this.byId("passwordlogin").setValueState("None");
        },

        onKeyPress: function(oEvent) {
            // Allow login with Enter key
            if (oEvent.getParameter("keyCode") === 13) {
                this.onLogin();
            }
        }
    });
});