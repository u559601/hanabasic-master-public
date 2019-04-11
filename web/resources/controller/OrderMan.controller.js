sap.ui.define(
	["de/htwberlin/adbkt/basic1/controller/BaseController", "sap/m/MessageToast", "sap/ui/model/json/JSONModel"],
	function (BaseController, MessageToast, JSONModel) {
		"use strict";

		return BaseController.extend("de.htwberlin.adbkt.basic1.controller.OrderMan", {
			onInit: function () {
				var oCustomerModel = new JSONModel({
					"KID": "k",
					"Name": "Name"
				});
				this.setModel(oCustomerModel, "c");

                var oOrderModel = new JSONModel({
                    "BID": "b1",
                    "Bestelldatum": "20180210",
                    "KID": "k1",
                    "SID": "s1"
                });
                this.setModel(oOrderModel, "o");

                var oOrderPositionModel = new JSONModel({
                    "PID": "p1",
                    "Menge": "0",
                    "BID": "b1",
                    "AID": "a1"
                });
                this.setModel(oOrderPositionModel, "op");

                var oArtikelModel = new JSONModel({
                    "AID": "a1",
                    "Beschreibung": "..."
                });
                this.setModel(oArtikelModel, "a");
			},

			onCreateCustomer: function () { this.onCreateItem("c","tableCustomers");},
			onCreateArtikel: function () { this.onCreateItem("a","tableArtikel");},


			onCreateItem: function (modelName, tableId) {
				// var oOdataModel = this.getModel("orderMan");
				var oNewItem = this.getModel(modelName).getData();
				var oBinding = this.byId(tableId).getBinding("items");
				var oContext = oBinding.create(oNewItem);

				oContext.created().then(
					function () {
						MessageToast.show(trigger + ' angelegt.');
					},
					function (error) {
						MessageToast.show(error.responseText);
					}
				);
				this.onUpdate();
			},

			onRefreshUser: function () {
				var oBinding = this.byId("tableCustomers").getBinding("items");

				if (oBinding.hasPendingChanges()) {
					MessageBox.error("Refresh nicht möglich");
					return;
				}
				oBinding.refresh();
				MessageToast.show("Refresh erfolgreich");
			},

			onDeleteUser : function () { this.deleteSelectedFromTable("tableCustomers")},

			deleteSelectedFromTable: function (tableName) {
				var oSelected = this.byId(tableName).getSelectedItem();

				if (oSelected) {
					oSelected.getBindingContext("orderMan").delete("$auto").then(function () {
						MessageToast.show("Löschen erfolgreich");
					}.bind(this), function (oError) {
						MessageBox.error(oError.message);
					});
				}
			},

			onCustomerSelectionChange: function () {
				var oSelected = this.byId("tableCustomers").getSelectedItem();

				if (oSelected) {
					var aCells = oSelected.getCells();
					var sKID = aCells[0].getText();

					var oTable = this.byId("tableOrders");
					var oBinding = oTable.getBinding("items");

					var oFilter = new sap.ui.model.Filter({
						path: "KID_KID",
						operator: sap.ui.model.FilterOperator.EQ,
						value1: sKID
					});
					oBinding.filter(oFilter);
				}
			}
		});

	});