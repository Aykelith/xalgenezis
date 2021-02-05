//= Functions & Modules
// Packages
import BaseClient from "@aykelith/xalgenezis-odm";

export default abstract class MongoDBClient extends BaseClient {
    async connect(connectionData): Promise<void> {

    }

    async getDefaultDatabase(): Promise<Database> {
        
    }

    async getDatabase(name: string): Promsie<Database> {
        
    }
};