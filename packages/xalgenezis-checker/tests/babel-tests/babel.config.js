let path = require("path");

module.exports = {
    "plugins": [
        [
            "module-resolver",
            {
                "root": [ path.join(__dirname, "..", "..", "src") ],
            }
        ],
        [ "@babel/plugin-syntax-object-rest-spread" ]
        [ path.join(__dirname, "..", "..", "babel", "Checker.js") ]
    ]
};