sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
  ], function(Controller, MessageToast, JSONModel) {
    "use strict";
  
    return Controller.extend("fioriapp.controller.Signup", {
      onInit: function() {
        var oSignupModel = new JSONModel({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
          department: "",
          acceptTerms: false,
          isLoading: false
        });
        this.getView().setModel(oSignupModel, "signup");
      },
  
      onSignup: function () {
        var oModel = this.getView().getModel("signup");
        var oData = oModel.getData();
  
        // Validation
        if (!this._validateForm(oData)) {
          return;
        }
  
        // Set loading state
        oModel.setProperty("/isLoading", true);
  
        // Simulate registration process
        setTimeout(() => {
          MessageToast.show("Account created successfully for " + oData.username + "!");
          
          // In a real app, you would send this data to your backend
          console.log("New user registration:", {
            username: oData.username,
            email: oData.email,
            firstName: oData.firstName,
            lastName: oData.lastName,
            department: oData.department
          });
  
          // Navigate back to login
          this.getOwnerComponent().getRouter().navTo("Login");
          
          oModel.setProperty("/isLoading", false);
        }, 1500);
      },
  
      _validateForm: function(oData) {
        var bValid = true;
        var aErrors = [];
  
        // Reset validation states
        this._clearValidationStates();
  
        // Username validation
        if (!oData.username || oData.username.length < 3) {
          this.byId("username").setValueState("Error");
          this.byId("username").setValueStateText("Username must be at least 3 characters");
          aErrors.push("Invalid username");
          bValid = false;
        }
  
        // Email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!oData.email || !emailRegex.test(oData.email)) {
          this.byId("emailsignup").setValueState("Error");
          this.byId("emailsignup").setValueStateText("Please enter a valid email address");
          aErrors.push("Invalid email");
          bValid = false;
        }
  
        // Password validation
        if (!oData.password || oData.password.length < 6) {
          this.byId("passwordsignup").setValueState("Error");
          this.byId("passwordsignup").setValueStateText("Password must be at least 6 characters");
          aErrors.push("Password too short");
          bValid = false;
        }
  
        // Confirm password validation
        if (oData.password !== oData.confirmPassword) {
          this.byId("confirmPassword").setValueState("Error");
          this.byId("confirmPassword").setValueStateText("Passwords do not match");
          aErrors.push("Passwords don't match");
          bValid = false;
        }
  
        // First name validation
        if (!oData.firstName) {
          this.byId("firstName").setValueState("Error");
          aErrors.push("First name required");
          bValid = false;
        }
  
        // Last name validation
        if (!oData.lastName) {
          this.byId("lastName").setValueState("Error");
          aErrors.push("Last name required");
          bValid = false;
        }
  
        // Terms acceptance
        if (!oData.acceptTerms) {
          MessageToast.show("Please accept the terms and conditions");
          bValid = false;
        }
  
        if (!bValid) {
          MessageToast.show("Please correct the errors in the form");
        }
  
        return bValid;
      },
  
      _clearValidationStates: function() {
        var aInputIds = ["username", "emailsignup", "passwordsignup", "confirmPassword", "firstName", "lastName"];
        aInputIds.forEach(function(sId) {
          this.byId(sId).setValueState("None");
        }.bind(this));
      },
  
      onNavigateToLogin: function () {
        this.getOwnerComponent().getRouter().navTo("Login");
      },
  
      onFieldChange: function(oEvent) {
        // Clear validation state when user starts typing
        oEvent.getSource().setValueState("None");
      }
    });
  });