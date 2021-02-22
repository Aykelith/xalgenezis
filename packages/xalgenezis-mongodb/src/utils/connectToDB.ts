//= Functions & Modules
// Packages
import { MongoClient, Db as MongoDB } from "mongodb";

export default async (mongoURI: string): Promise<MongoDB> => {
  const mongoClient = await MongoClient.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // connectTimeoutMS: Number.MAX_VALUE // <= Number of tries to try to reconnect before to show "Topology was destroyed", default 30
  });

  return mongoClient.db();
};
