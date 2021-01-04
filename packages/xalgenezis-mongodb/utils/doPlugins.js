//= Funcitons & Modules
// xalgenezis
import GenezisChecker from "@aykelith/xalgenezis-checker";

const isProduction = process.env.NODE_ENV == "production";

const GenezisCheckerSettingsConfig = {

};

export const PLUGIN_ARGS_REQUIREMENTS_KEYWORD = "pluginArgsRequirements";

function constructPluginObjectArgument(plugin, args) {
    if (!isProduction) {
        if (!plugin[PLUGIN_ARGS_REQUIREMENTS_KEYWORD]) throw new Error(`The plugin "${plugin.name}" doesn't have the "${PLUGIN_ARGS_REQUIREMENTS_KEYWORD}"`);

        plugin[PLUGIN_ARGS_REQUIREMENTS_KEYWORD].forEach(requirement => {
            let requirementName, options = {};
            if (typeof requirement === "string") requirementName = requirement;
            else {
                requirementName = requirement.name;
                options = requirement;
            }
            
            if (args[requirementName] === undefined) {
                if (options.skipIfFail/*deprecated*/ || options.canBeNull) return;
                if (options.requiredIf) {
                    let fail = false;
                    
                    for (const key in options.requiredIf) {
                        if (args[key] === options.requiredIf[key]) {
                            fail = true;
                            break;
                        }
                    }

                    if (!fail) return;
                } 

                throw new Error(`The requirement "${requirement}" of plugin "${plugin.name}" is not given in the plugin arguments`);
            }
        });
    }

    let pluginArgs = {};
    plugin[PLUGIN_ARGS_REQUIREMENTS_KEYWORD].forEach(requirement => {
		const field = typeof requirement === "string" ? requirement : requirement.name;
        pluginArgs[field] = args[field];
    });

    return pluginArgs;
}

export default async (plugins, args, settings) => {
    let arePluginsArray = Array.isArray(plugins);
    let _plugins = arePluginsArray ? plugins : Object.values(plugins);

    let answers;
    let pluginsNames;

    answers = [];

    args.pluginsAnswers = answers;

    if (!settings.runParallel) {
        for (let i=0, length=_plugins.length; i < length; ++i) {
            console.log(`Doing plugin ${i+1}/${length}`);
            try {
                const answer = await _plugins[i](constructPluginObjectArgument(_plugins[i], args));

                answers.push(answer);
            } catch (error) {
                if (settings.onError) {
                    if (settings.onError.crashImmediatly) {
                        if (settings.onError.executePlugins) {
                            for (let j=0, length2=settings.onError.executePlugins.length; j < length2; ++j) {
                                await settings.onError.executePlugins[j](error, ...args);
                            }
                        }

                        throw error;
                    }
                }
            }
        }
    }

    return answers;
};