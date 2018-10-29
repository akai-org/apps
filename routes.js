const routes = require("next-routes");

module.exports = routes()
  .add("index", "/")
  .add("project", "/project/:slug");
