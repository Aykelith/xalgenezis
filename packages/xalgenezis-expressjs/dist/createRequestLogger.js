export default (settings) => {
    if (process.env.NODE_ENV === "production") {
        return () => { return () => { }; };
    }
    return (head = "HEAD_IS_NOT_SETTED") => {
        return (req, data) => console.debug(`${head}${settings.extraRequestData ? settings.extraRequestData(req, data) : ""}Entered with data:"${JSON.stringify(data)}"`);
    };
};
//# sourceMappingURL=createRequestLogger.js.map