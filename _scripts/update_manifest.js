var fs = require("fs");
var path = require("path")
var manifest = require(path.join(__dirname, "../extension/manifest.json"));
manifest.applications = {
    "gecko": {
        "id": "firefox-extensions@vozliving.com",
        "strict_min_version": "42.0",
        "strict_max_version": "*"
    }
};

fs.writeFileSync(path.join(__dirname, "../extension/manifest.json"), JSON.stringify(manifest, null, "\t"));
