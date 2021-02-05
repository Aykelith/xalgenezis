export default abstract class Client {
    constructor() {
        
    }

    abstract connect(connectionData): Promise<void>;

    abstract getDefaultDatabase(): Promise<Database>;

    abstract getDatabase(name: string): Promsie<Database>;
};