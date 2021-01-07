//= Functions & Modules
// Packages
import Express from "express";

export interface SettingsType {
    viewEngine?: string,
    viewsPaths?: string[],
    staticPaths?: string[],
    supportJSONRequest?: {
        limit?: string
    },
    supportGet?: {
        limit?: string,
        extended?: boolean,
    },
    trustProxy?: boolean,
    hmr?: {
        webpackConfigFilePath: string   
    },
    session?: {
        secret: string,
        saveUninitialized?: boolean,
        resave: boolean,
        cookie?: {
            secure: boolean
        },
        store: Function
    },
    port?: number,
    plugins?: Function[],
    before?: Function,
    onlySecure?: boolean,
    secureSettings?: {
        key: string,
        cert: string,
        port?: number
    }
    webpack_hot_middleware_settings?: any
};

/**
 * 
 */
export default async (settings : SettingsType) => {
    const app = Express(); // Initialize Express variable

    if (settings.before) await settings.before(app);

    if (settings.viewEngine) {
        app.set("view engine", settings.viewEngine); // Setting up the view engine
        app.set("views", settings.viewsPaths); // Setting up the views folder
    }

    if (settings.staticPaths) {
        settings.staticPaths.forEach(path => app.use(Express.static(path)));
    }

    if (settings.supportJSONRequest) {
        app.use(require("body-parser").json({ limit: settings.supportJSONRequest.limit }));
    }

    if (settings.supportGet) {
        app.use(require("body-parser").urlencoded({
            extended: settings.supportGet.extended,
            limit: settings.supportGet.limit
        }));
    }

    if (settings.trustProxy) app.enable("trust proxy");

    if (settings.session) {
        const session = require("express-session");
        if (settings.session.store) settings.session.store = settings.session.store(session); 

        app.use(session(settings.session));
    }

    if (settings.hmr) {
        const webpack = require("webpack");
        const webpackConfig = require(settings.hmr.webpackConfigFilePath);
        const compiler = webpack(webpackConfig);

        app.use(require("webpack-dev-middleware")(compiler, {
            publicPath: webpackConfig.output.publicPath
        }));
        
        app.use(require("webpack-hot-middleware")(compiler, {
            log: console.log,
            path: "/__webpack_hmr", 
            heartbeat: 10 * 1000,
            ...(settings.webpack_hot_middleware_settings || {})
        }));

        // @ts-ignore
        app.webpackCompiler = compiler;
    }

    if (settings.plugins) {
        await Promise.all(settings.plugins.map(plugin => plugin(app)));
    }

    if (!settings.onlySecure) {
        const http = require("http");

        const server = new http.Server(app); // Create a server through Express
        server.listen(settings.port, (err : Error) => {
            if (err) {
                return console.error(err);
            }
            console.info(`Server running on http://localhost:${settings.port}`);
        });
    }

    if (settings.secureSettings) {
        const fs = require("fs");
        const https = require("https");

        const httpsOptions = {
            key: fs.readFileSync(settings.secureSettings.key),
            cert: fs.readFileSync(settings.secureSettings.cert)
        };

        const server = new https.Server(httpsOptions, app); // Create a server through Express
        server.listen(settings.secureSettings.port, (err : Error) => {
            if (err) {
                return console.error(err);
            }
            // @ts-ignore
            console.info(`Server running on port ${settings.secureSettings.port}`);
        });
    }

    return app;
}
