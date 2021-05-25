//= Functions & Modules
// Packages
import Express from "express";
import fs from "fs";

//= Structures & Data
// Own
import CreateServerSettings from "./data/CreateServerSettings";

/**
 *
 */
export default async (settings: CreateServerSettings) => {
  const app = Express() as Express.Express & { webpackCompiler: any }; // Initialize Express variable

  if (settings.before) await settings.before(app);

  if (settings.viewEngine) {
    app.set("view engine", settings.viewEngine); // Setting up the view engine
    app.set("views", settings.viewsPaths); // Setting up the views folder
  }

  if (settings.staticPaths) {
    settings.staticPaths.forEach((path) => app.use(Express.static(path)));
  }

  if (settings.supportJSONRequest) {
    app.use(
      require("body-parser").json({ limit: settings.supportJSONRequest.limit })
    );
  }

  if (settings.supportGet) {
    app.use(
      require("body-parser").urlencoded({
        extended: settings.supportGet.extended,
        limit: settings.supportGet.limit,
      })
    );
  }

  if (settings.trustProxy) app.enable("trust proxy");

  if (settings.session) {
    const session = require("express-session");
    if (settings.session.store)
      settings.session.store = settings.session.store(session);

    app.use(session(settings.session));
  }

  if (settings.hmr) {
    const webpack = require("webpack");
    const WebpackCompiledEventName = require("./data/WebpackCompiledEventName")
      .default;

    let allWebpackConfigs = [];
    for (const webpackEntry of settings.hmr!.webpackEntries) {
      let webpackConfig = require(webpackEntry.configFilePath);
      if (webpackConfig.default) webpackConfig = webpackConfig.default;
      allWebpackConfigs.push(webpackConfig);
    }

    const compiler = webpack(allWebpackConfigs);

    app.use(
      require("webpack-dev-middleware")(compiler, {
        publicPath: allWebpackConfigs[0].output.publicPath,
      })
    );

    app.use(
      require("webpack-hot-middleware")(compiler, {
        path: "/__webpack_hmr",
        heartbeat: 10 * 1000,
        ...(settings.webpack_hot_middleware_settings || {}),
      })
    );

    app.webpackCompiler = compiler;

    let lastTimeBuilds: { [key: string]: number } = {};

    if (settings.hmr.eventsEmitter) {
      app.webpackCompiler.hooks.done.tap("XALGENEZIS", (stats: any) => {
        try {
          const statsJson = stats.toJson();

          for (const statsEntry of statsJson.children) {
            if (statsEntry.builtAt == lastTimeBuilds[statsEntry.name]) continue;

            lastTimeBuilds[statsEntry.name] = statsEntry.builtAt;

            const fullChunks: any = {};
            Object.keys(statsEntry.namedChunkGroups).forEach((key) => {
              fullChunks[key] = statsEntry.namedChunkGroups[key].assets;
            });

            const webpackStatsJSON = {
              chunks: statsEntry.assetsByChunkName,
              fullChunks,
            };

            /*if (webpackEntry.statsFilePath) {
            fs.writeFileSync(
              webpackEntry.statsFilePath,
              JSON.stringify(webpackStatsJSON)
            );
          }*/

            settings.hmr!.eventsEmitter.emit(
              WebpackCompiledEventName,
              statsEntry.name,
              webpackStatsJSON
            );
          }
        } catch (error) {
          console.error(error);
        }
      });
    }
  }

  if (settings.plugins) {
    await Promise.all(settings.plugins.map((plugin) => plugin(app)));
  }

  if (!settings.onlySecure) {
    const http = require("http");

    const server = new http.Server(app); // Create a server through Express
    server.listen(settings.port, (err: Error) => {
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
      cert: fs.readFileSync(settings.secureSettings.cert),
    };

    const server = new https.Server(httpsOptions, app); // Create a server through Express
    server.listen(settings.secureSettings.port, (err: Error) => {
      if (err) {
        return console.error(err);
      }
      // @ts-ignore
      console.info(`Server running on port ${settings.secureSettings.port}`);
    });
  }

  return app;
};
