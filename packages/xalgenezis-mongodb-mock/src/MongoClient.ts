//= Functions & Modules
// Own
import Db from "./Db";

function generateRandomName(): string {
  return Math.random().toString(36).substring(7);
}

export default class MongoClient {
  private url: string;
  private options: any;
  private dbs: { [key: string]: Db };

  constructor(url: string = "wow", options: any = {}) {
    this.url = url;
    this.options = options;
    this.dbs = {};
  }

  static async connect(url: string, options?: any) {
    return new MongoClient(url, options);
  }

  async connect() {}

  db(dbName?: string, _options?: any) {
    if (!dbName) dbName = generateRandomName();

    if (!this.dbs[dbName]) this.dbs[dbName] = new Db();

    return this.dbs[dbName];
  }
}
