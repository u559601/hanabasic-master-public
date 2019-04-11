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
                    "Bestelldatum": "2018-02-10",
                    "SID_SID": "s1"
                });
                this.setModel(oOrderModel, "o");

                var oOrderPositionModel = new JSONModel({
                    "PID": "p",
                    "Menge": 1
                });
                this.setModel(oOrderPositionModel, "op");

                var oArtikelModel = new JSONModel({
                    "AID": "a1",
                    "Beschreibung": "..."
                });
                this.setModel(oArtikelModel, "a");
			},

			onCreateCustomer: function () { this.onCreateItem(this.getModel("c"),"tableCustomers", "Kunden");},
			onCreateArtikel: function () { this.onCreateItem(this.getModel("a"),"tableArtikel", "Artikel");},
			onCreateOrder: function () {
				var order = this.getModel("o").getData();
				order.KID_KID = this.getSelectedItemId("tableCustomers");
				this.onCreateItem(order,"tableOrders", "Bestellung");},

			onCreateOrderPos: function () {
				var orderposition = this.getModel("op").getData();
				orderposition.BID_BID = this.getSelectedItemId("tableOrders");
				orderposition.AID_AID = this.getSelectedItemId("tableArtikel");
				this.onCreateItem(orderposition,"tableOrdersPos", "Bestellposition");},

			getSelectedItemId: function (tableId) {
				var oSelected = this.byId(tableId).getSelectedItem();
				if (oSelected) {
					var aCells = oSelected.getCells();
					 return aCells[0].getText();
				}
			},

			onCreateItem: function (newItem, tableId, message) {
				console.log("save :" + newItem);
				// var oOdataModel = this.getModel("orderMan");
				var oBinding = this.byId(tableId).getBinding("items");
				var oContext = oBinding.create(newItem);

				oContext.created().then(
					function () {
						MessageToast.show(message + ' angelegt.');
					},
					function (error) {
						MessageToast.show(error.responseText);
					}
				);
				this.refreshTable(tableId);
			},

            onRefreshUser: function () {this.refreshTable("tableCustomers")},
			onRefreshOrder: function () {this.refreshTable("tableOrders")},
			onRefreshOrderPos: function () {this.refreshTable("tableOrdersPos")},
			onRefreshArtikel: function () {this.refreshTable("tableArtikel")},

			refreshTable: function (tableId) {
				var oBinding = this.byId(tableId).getBinding("items");

				if (oBinding.hasPendingChanges()) {
					MessageToast.error("Refresh nicht möglich");
					return;
				}
				oBinding.refresh();
				MessageToast.show("Refresh erfolgreich");
			},

			onDeleteUser : function () { this.deleteSelectedFromTable("tableCustomers")},
			onDeleteOrder : function () { this.deleteSelectedFromTable("tableOrders")},
			onDeleteOrderPos : function () { this.deleteSelectedFromTable("tableOrdersPos")},
			onDeleteArtikel : function () { this.deleteSelectedFromTable("tableArtikel")},

			deleteSelectedFromTable: function (tableName) {
				var oSelected = this.byId(tableName).getSelectedItem();

				if (oSelected) {
					oSelected.getBindingContext("orderMan").delete("$auto").then(function () {
						MessageToast.show("Löschen erfolgreich");
					}.bind(this), function (oError) {
						MessageToast.error(oError.message);
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
			},

			onOrderSelectionChange: function () {
				var sBID = this.getSelectedItemId("tableOrders");

				var oBinding = this.byId("tableOrdersPos").getBinding("items");
				var oFilter = new sap.ui.model.Filter({
					path: "BID_BID",
					operator: sap.ui.model.FilterOperator.EQ,
					value1: sBID
				});
				oBinding.filter(oFilter);

			}
		});

	});