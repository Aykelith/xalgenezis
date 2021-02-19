export default abstract class Model {
    abstract raw(): any;
    abstract getOne(query: GetQuery, settings: GetOneSettings): Element;
    abstract getMany(query: GetQuery, settings: GetManySettings): Element[];

    abstract addOne(entry: Element, settings: AddOneSettings): Promise<void>;
    abstract addMany(entries: Element[], settings: AddManySettings): Promise<void>;

    abstract deleteOne(query: GetQuery, settings: DeleteOneSettings): any;
    abstract deleteMany(query: GetQuery, settings: DeleteManySettings): any;

    abstract editOne(query: GetQuery, update: any, settings: EditOneSettings): any;
    abstract editMany(query: GetQuery, update: any, settings: EditManySettings): any;
};
