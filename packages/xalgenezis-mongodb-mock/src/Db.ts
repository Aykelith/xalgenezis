//= Functions & Modules
// Own
import Collection from "./Collection";

export default class Db {
    private collections: { [key: string]: Collection };

    constructor() {
        this.collections = {};
    }

    collection(name: string, _options?: any) {
        if (!this.collections[name]) this.collections[name] = new Collection(name);

        return this.collections[name];
    }

    async ensureIndex(name: string, fieldOrSpec: any, options: any) {}
}
