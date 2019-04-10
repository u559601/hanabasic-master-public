/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
"use strict";
var express = require("express");

module.exports = () => {
	var app = express.Router();

	app.get("/", (req, res) => {
		res.send(`${req.query.num1 * req.query.num2}`);
	});
	return app;
};

