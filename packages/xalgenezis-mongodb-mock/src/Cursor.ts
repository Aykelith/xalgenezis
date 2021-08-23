//= Functions & Modules
// Own
import { Collection } from "./index";
import QuerySolver from "./QuerySolver";
import GenericQuery from "./GenericQuery";

export default class Cursor {
    private lastIndex: number;
    private querySolver: QuerySolver;
    private collection: Collection;

    constructor(query: GenericQuery, settings: { [key: string]: any }, collection: Collection) {
        this.collection = collection;

        this.lastIndex = 0;
        this.querySolver = new QuerySolver(query, collection.name);
    }

    async next() {
        for (let length = this.collection.data.length; this.lastIndex < length; ) {
            const doc = this.collection.data[this.lastIndex];
            ++this.lastIndex;
            if (this.querySolver.isMatching(doc)) return doc;
        }

        return null;
    }
}
