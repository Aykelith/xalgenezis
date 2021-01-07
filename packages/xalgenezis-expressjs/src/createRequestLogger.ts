export interface SettingsType {
    extraRequestData?: Function
}

export default (settings : SettingsType) => {
    if (process.env.NODE_ENV === "production") {
        return () => { return () => {}; };
    }

    return (head = "HEAD_IS_NOT_SETTED") => {
        return (req : Request, data : any) => console.debug(`${head}${settings.extraRequestData ? settings.extraRequestData(req, data) : ""}Entered with data:"${JSON.stringify(data)}"`);
    }
}