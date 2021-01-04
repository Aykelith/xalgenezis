let path = require("path");

module.exports = {
    "presets": [
        [
            "@babel/env",
            {
                "useBuiltIns": "usage",
                "corejs": 3
            }
        ],
        "@babel/react"
    ],
    "plugins": [
        [
            "module-resolver",
            {
                "root": [
                    path.join(__dirname, "..", "src"),
                ],
            }
        ],
        [
            "@babel/plugin-syntax-object-rest-spread"
        ],
        [
            "@babel/plugin-syntax-dynamic-import"
        ],
        [
            "@babel/plugin-syntax-async-generators"
        ],
        [
            "@babel/plugin-transform-regenerator"
        ],
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
        [path.join(__dirname, "..", "babel", "Checker.js")]
    ]
};