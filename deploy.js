var ghpages = require("gh-pages");
var fs = require("fs");

fs.writeFile("build/CNAME", "apps.akai.org.pl", function (err) { });
ghpages.publish("build", function (err) { });