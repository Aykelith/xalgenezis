//= Functions & Modules
// Own
import { Cursor } from "./index";
import GenericDoc from "./GenericDoc";
import GenericQuery from "./GenericQuery";
import QuerySolver from "./QuerySolver";
// Others
import { ObjectID as MongoID } from "mongodb";

export default class Collection {
    public name: string;
    public data: GenericDoc[];
    public ids: { [key: string]: number };

    constructor(name: string) {
        this.data = [];
        this.ids = {};
        this.name = name;
    }

    async ensureIndex() {
        throw new Error('Method "ensureIndex" is not implemented');
    }

    async deleteMany(query: GenericQuery, settings: { [key: string]: any } = {}) {
        if (Object.keys(query).length === 0) {
            this.data = [];
            this.ids = {};
        } else {
            throw new Error('Method "deleteMany" is not implemented for specific query');
        }
    }

    async deleteOne(query: GenericQuery, settings: { [key: string]: any } = {}) {
        console.log(`db:col#${this.name}:deleteOne:query#'${JSON.stringify(query)}'`);

        const searchedDoc = await this.findOne(query, settings);

        if (searchedDoc) {
            const index = this.ids[searchedDoc._id.toHexString()];
            delete this.ids[searchedDoc._id.toHexString()];

            this.data.splice(index, 1);
        }
    }

    find(query: { [key: string]: any }, settings: { [key: string]: any } = {}) {
        console.log(`db:col#${this.name}:find:query#'${JSON.stringify(query)}'`);
        return new Cursor(query, settings, this);
    }

    async findAndModify() {
        throw new Error('Method "findAndModify" is not implemented');
    }

    async findAndRemove() {
        throw new Error('Method "findAndRemove" is not implemented');
    }

    async findOne(query: GenericQuery, _settings: any = {}) {
        console.log(`db:col#${this.name}:findQuery:query#'${JSON.stringify(query)}'`);

        const querySolver = new QuerySolver(query, this.name);

        for (let i = 0, length = this.data.length; i < length; ++i) {
            if (querySolver.isMatching(this.data[i])) {
                return this.data[i];
            }
        }

        return null;
    }

    async findOneAndDelete() {
        throw new Error('Method "findOneAndDelete" is not implemented');
    }

    async findOneAndReplace() {
        throw new Error('Method "findOneAndReplace" is not implemented');
    }

    async findOneAndUpdate() {
        throw new Error('Method "findOneAndUpdate" is not implemented');
    }

    async insertOne(doc: GenericDoc, _settings: any = {}) {
        if (!doc._id) doc._id = new MongoID();

        this.ids[doc._id.toHexString()] = this.data.length;
        this.data.push(doc);

        console.log(`db:col#${this.name}:insertOne:_id#${doc._id.toHexString()}`);

        return { insertedId: doc._id, insertedDoc: doc };
    }

    async insertMany(docs: GenericDoc[], _settings: any = {}) {
        for (let i = 0, length = docs.length; i < length; ++i) {
            await this.insertOne(docs[i], _settings);
        }
    }

    async updateOne(searchQuery: GenericQuery, updateQuery: GenericQuery, _settings: any) {
        console.log(
            `db:col#${this.name}:updateOne:searchQuery#'${JSON.stringify(searchQuery)}',updateQuery#'${JSON.stringify(updateQuery)}'`
        );
        const searchedDoc = await this.findOne(searchQuery);

        if (searchedDoc === null) return { modifiedCount: 0 };

        const index = this.ids[searchedDoc._id.toHexString()];

        const fieldsKeys = Object.keys(updateQuery);
        for (const fieldKey of fieldsKeys) {
            const fieldValue = updateQuery[fieldKey];
            const subFieldsKeys = Object.keys(fieldValue);

            for (const subFieldKey of subFieldsKeys) {
                const subFields = subFieldKey.split(".");
                const currentDoc = this.getDeeperObject(this.data[index], subFields.slice(0, subFields.length - 1));
                const lastSubField = subFields[subFields.length - 1];

                if (fieldKey === "$set") {
                    currentDoc[lastSubField] = fieldValue[subFieldKey];
                } else if (fieldKey === "$inc") {
                    if (currentDoc[lastSubField] === undefined) currentDoc[lastSubField] = 0;
                    currentDoc[lastSubField] += fieldValue[subFieldKey];
                } else {
                    throw new Error("TODO 2");
                }
            }
        }

        return { modifiedCount: 1 };
    }

    async updateMany() {
        throw new Error('Method "updateMany" is not implemented');
    }

    private getDeeperObject(rootObject: { [key: string]: any }, levels: string[]) {
        let currentObject = rootObject;
        for (let i = 0, length = levels.length; i < length; ++i) {
            if (!currentObject[levels[i]]) currentObject[levels[i]] = {};
            currentObject = currentObject[levels[i]];
        }

        return currentObject;
    }
}
