//= Functions & Modules
// Packages
import jsonfile from "jsonfile";
import axios    from "axios";
import { EventEmitter } from "events";

/**
 * The class that is responsible to getting and managing the webpack generated
 * stats
 * 
 * When the webpack stats are refreshed all the callbacks saved using `onRefresh`
 * are called
 * 
 * @class
 */
export default class WebpackStatsManager {
    chunksFiles : any;
    fullChunksFiles: any;
    _webpackStatsPath : string;
    _onRefreshEvents : Function[];

    /**
     * @constructor
     * @memberof WebpackStatsManager
     * 
     * @param {String} webpackStatsPath   the path to the webpack stats file
     * @param {EventEmitter} eventEmitter the event emitter for receiving updates
     */
    constructor(webpackStatsPath : string, eventEmitter : EventEmitter) {
        this.chunksFiles = {};
        this.fullChunksFiles = {};

        this._webpackStatsPath = webpackStatsPath;
        this._onRefreshEvents = [];

        eventEmitter.on("refreshWebpackStats", async () => {
            await this._loadWebpackStats();
            this._onRefreshEvents.forEach(f => f());
        });
    }

    /**
     * Load the webpack stats from the file
     * @memberof WebpackStatsManager
     * @private
     */
    async _loadWebpackStats() {
        let webpackStats : any;
        if (this._webpackStatsPath.startsWith("http://")) {
            webpackStats = (await axios.get(this._webpackStatsPath)).data;
        } else {
            webpackStats = jsonfile.readFileSync(this._webpackStatsPath);
        }
    
        // baseScriptsToLoad = "";
        // for (let i=0, length=webpackStats.baseScriptsToLoad.length; i < length; ++i) {
        //     baseScriptsToLoad += `<script defer src="/generated/${webpackStats.baseScriptsToLoad[i]}"></script>`;
        // }

        this.chunksFiles = webpackStats.chunks || {};
        this.fullChunksFiles = webpackStats.fullChunks || {};
    }

    /**
     * Get the scripts of the given entrypoint
     * @memberof WebpackStatsManager
     * @public
     * 
     * @param {String} entrypointName the name of the entrypoint
     */
    getEntrypointScripts(entrypointName : string) : string {
        let baseScriptsToLoad = "";
        if (typeof this.chunksFiles[entrypointName] === "string") {
            baseScriptsToLoad = `<script defer src="/generated/${this.chunksFiles[entrypointName]}"></script>`;
        } else if (Array.isArray(this.chunksFiles[entrypointName])) {
            this.chunksFiles[entrypointName].forEach((file : string) => {
                if (file.includes(".js")) {
                    baseScriptsToLoad += `<script defer src="/generated/${file}"></script>`;
                } else if (file.includes(".css")) {
                    baseScriptsToLoad += `<link rel="stylesheet" href="/generated/${file}"/>`;
                } else {
                    throw new Error();
                }
            });
        } else {
            // If the entrypoint was not found the environment variable for dynamic updating the webpack is set
            // then we wait for it to be generated and return nothing instead
            // 
            // This should happen only when the given file for webpack stat doesn't exists
            if (process.env.PANOROCRM_REACT_HOT_RELOAD_WEBPACK_PATH) {
                console.debug("Could not find the entry point, so we wait for it to be generated");
                return "";
            }
            
            else throw new Error(`Not found the entrypoint ${entrypointName} between chunks`);
        }

        return baseScriptsToLoad;
    }

    /**
     * Get the scripts specific for a chunk
     * @memberof WebpackStatsManager
     * @public
     * 
     * @param {String} chunkName          the name of the chunk
     * @param {Boolean} getFromFullChunks if to get the chunk from the pile of full chunks
     */
    getChunkScripts(chunkName : string, getFromFullChunks = false) : string {
        const chunks : any = getFromFullChunks ? this.fullChunksFiles[chunkName] : this.chunksFiles[chunkName];

        let head = "";
        
        if (chunks) {
            if (Array.isArray(chunks)) {
                chunks.forEach(file => {
                    if (file.includes(".js")) {
                        head += `<script src="/generated/${file}"></script>`;
                    } else if (file.includes(".css")) {
                        head += `<link rel="stylesheet" href="/generated/${file}"/>`;
                    } else {
                        throw new Error();
                    }
                });
            } else if (typeof chunks === "string") {
                head += `<script defer src="/generated/${chunks}"></script>`;
            } else {
                throw new Error();
            }
        }
    
        return head;
    }

    /**
     * Add a handler to be called when the webpack stats are refreshed
     * @memberof WebpackStatsManager
     * @public
     * 
     * @param {Function} handler the function to be called
     */
    onRefresh(handler : Function) {
        this._onRefreshEvents.push(handler);
    }
}