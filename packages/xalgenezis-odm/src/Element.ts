export default abstract class Element {
    abstract save(): Promise<void>;
    abstract delete(): Promise<void>;
};
