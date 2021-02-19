//= Functions & Modules
// Own
import Model from "./Model";

export default abstract class Database {
    private _modelsStructures: { [modelName : string]: ModelStructure } = {};

    constructor() {
        
    }

    abstract getModel(name: string): Promise<Model>;

    abstract deleteModel(name: string): Promise<Model>;

    abstract createModel(name: string, structure: ModelStructure): Promise<Model>;

    abstract doesModelExistsInDB(name: string): Promise<boolean>;

    /**
      * Load a model into the database
      * @function
      * @memberof Database
      *
      * @param {ModelStructure}
      */
    loadModel(modelStructure: ModelStructure) {
        // Check if the model is not already exists
        if (this._modelsStructures[modelStructure.name]) {
            throw new Error("A model with the same name already exists");
        }

        this._modelsStructures[modelStructure.name] = modelStructure;
    }
}
