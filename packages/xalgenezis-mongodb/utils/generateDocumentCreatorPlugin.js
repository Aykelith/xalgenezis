//= Functions & Modules
// Own
import { PLUGIN_ARGS_REQUIREMENTS_KEYWORD } from "./doPlugins";
import DocumentChecker from "../DocumentChecker";
// xalgenezis
import GenezisChecker, { deleteOnProduction } from "@aykelith/xalgenezis-checker";

const GeneratorGenezisCheckerConfig = deleteOnProduction({
    documentConfig: GenezisChecker.required(),
    createDocumentCreatorExtraParameters: GenezisChecker.function(),
    addExtraPluginArgs: GenezisChecker.function()
});

const DocumentCreatorGenezisCheckerConfig = deleteOnProduction({
    doc: GenezisChecker.object().required(),
    input: GenezisChecker.object()
});

/**
 * 
 */
export default (settings) => {
    GenezisChecker(settings, GeneratorGenezisCheckerConfig);

    async function documentCreator(data) {
        GenezisChecker(data, DocumentCreatorGenezisCheckerConfig);

        let documentCreatorExtraParameters = settings.createDocumentCreatorExtraParameters
                                                ? settings.createDocumentCreatorExtraParameters(data) 
                                                : [];

        Object.assign(data.doc, await DocumentChecker(data.input, settings.documentConfig, ...documentCreatorExtraParameters));
    }

    documentCreator[PLUGIN_ARGS_REQUIREMENTS_KEYWORD] = [
        "doc",
        "input"
    ];

    if (settings.addExtraPluginArgs) {
        settings.addExtraPluginArgs(documentCreator[PLUGIN_ARGS_REQUIREMENTS_KEYWORD]);
    }

    return documentCreator;
};
