export default interface MongoDBRequestFieldInterface {
  input: string;
  constValue?: any;
  field: string;
  convertFunc?: Function;
}

