//= Functions & Modules
// Packages
import fs from "fs";

export default (configFilePaths: string): any => {
  let configSettings: any = {};
  configFilePaths.split("@").forEach((configFilePath) => {
    if (!fs.existsSync(configFilePath)) {
      throw new Error(`The config file "${configFilePath}" doesn't exists`);
    }

    if (configFilePath.endsWith(".json")) {
      const jsonfile = require("jsonfile");

      try {
        Object.assign(configSettings, jsonfile.readFileSync(configFilePath));
      } catch (error) {
        throw new Error(
          `There where errors parsing the config file "${configFilePath}": ${error.message}`
        );
      }
    } else if (
      configFilePath.endsWith(".yml") ||
      configFilePath.endsWith(".yaml")
    ) {
      const yaml = require("js-yaml");

      try {
        Object.assign(
          configSettings,
          yaml.load(fs.readFileSync(configFilePath, "utf8"))
        );
      } catch (error) {
        throw new Error(
          `There where errors parsing the config file "${configFilePath}": ${error.message}`
        );
      }
    } else {
      throw new Error(
        `The extension of config file "${configFilePath}" is unsuportted. Only support JSON and YAML`
      );
    }
  });

  return configSettings;
};

