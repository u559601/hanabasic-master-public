/*eslint-env node, es6 */
"use strict";

module.exports = (app, server) => {
	app.use("/node/hw", require("./routes/hw")());
	app.use("/node/mult", require("./routes/mult")());
	app.use("/node/getSessionInfo", require("./routes/sessioninfo")());
};