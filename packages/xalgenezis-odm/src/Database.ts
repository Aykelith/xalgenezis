export default abstract class Database {
    abstract getModel(name: string): Promise<Model>;

    abstract deleteModel(name: string): Promise<Model>;

    abstract createModel(name: string, structure: ModelStructure): Promise<Model>;

    abstract doesModelExistsInDB(name: string): Promise<boolean>;

    abstract loadModel(name: string, structure: ModelStructure): Promise<void>;
}