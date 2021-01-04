//= Functions & Modules
// xalgenezis
import GenezisChecker, { deleteOnProduction } from "@aykelith/xalgenezis-checker";

const GenezisCheckerConfig = deleteOnProduction({
    extraRequestData: GenezisChecker.function()
});

export default (settings) => {
    GenezisChecker(settings, GenezisCheckerConfig);

    if (process.env.NODE_ENV === "production") {
        return () => { return () => {}; };
    }

    return (head = "HEAD_IS_NOT_SETTED") => {
        return (req, data) => console.debug(`${head}${settings.extraRequestData ? settings.extraRequestData(req, data) : ""}Entered with data:"${JSON.stringify(data)}"`);
    }
}