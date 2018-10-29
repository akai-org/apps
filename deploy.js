var ghpages = require("gh-pages");
var fs = require("fs");

fs.writeFile("out/CNAME", "apps.akai.org.pl", function(err) {});
ghpages.publish("out", function(err) {});
