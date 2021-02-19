interface ModelStructure {
    name: string,
    fields: {
        _id: ModelFieldType.ID;
        [key: string]: ModelFieldType
    },
    indexes: {

    }
}
