//= Functions & Modules
// Packages
import BaseModel from "@aykelith/xalgenezis-odm";

export default class MongoDBModel extends BaseModel {
    getRawTable(): any {

    }

    async getOne(query: GetQuery, settings: GetOneSettings): Promise<Element> {

    }

    async getMany(query: GetQuery, settings: GetManySettings): Promise<Element[]> {

    }


    async addOne(entry: Element, settings: AddOneSettings): Promise<void> {

    }

    async addMany(entries: Element[], settings: AddManySettings): Promise<void> {

    }


    async deleteOne(query: GetQuery, settings: DeleteOneSettings): Promise<void> {

    }

    async deleteMany(query: GetQuery, settings: DeleteManySettings): Promise<void> {

    }


    async editOne(query: GetQuery, update: ?, settings: EditOneSettings): Promise<void> {

    }

    async editMany(query: GetQuery, update: ?, settings: EditManySettings): Promise<void> {

    }


    async ensureIndex(query: IndexQuery, settings: CreateIndexSettings): Promise<void> {

    }

    async deleteIndex(name: string): Promise<void> {

    }

    async doesIndexExists(name: string): Promise<boolean> {

    }

    private constructGetQuery() {
        
    }
};