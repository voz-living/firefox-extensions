var fs = require("fs");
var path = require("path")

read_manifest()
.then(update_application)
.then(update_web_accessible_resources)
.then(write_manifest)

function read_manifest(){
    return Promise.resolve(require(path.join(__dirname, "../extension/manifest.json")))
}

function write_manifest(manifest){
    return Promise.resolve(fs.writeFileSync(path.join(__dirname, "../extension/manifest.json"), JSON.stringify(manifest, null, "\t")));
}

function update_application(manifest){
    manifest.applications = {
        "gecko": {
            "id": "firefox-extensions@vozliving.com",
            "strict_min_version": "42.0",
            "strict_max_version": "*"
        }
    };
    return Promise.resolve(manifest);
}

function update_web_accessible_resources(manifest){
    manifest.web_accessible_resources = [];
    var glob = require("glob");
    return new Promise(function(resolve, reject){
        var parent_dir = path.join(__dirname, "../extension")
        glob(path.join(__dirname, "../extension/**/**"), {}, function(er, files){
            if(er) reject(er);
            files = files.map(function(f){
                return f.replace(parent_dir, "");
            }).filter(function(f){
                return  !(f == "/manifest.json" ||
                        f.indexOf(".") == -1 ||
                        f.trim() == "")
            })
            manifest.web_accessible_resources = [].concat(files);
            resolve(manifest);
        });
    });
}
