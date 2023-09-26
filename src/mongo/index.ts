import * as mongoDB from "mongodb";
import dbConfig from "../config/mongo";
import { envconfig } from "../config/environment";
import { DecryptData } from "../utils/CryptrHelper";

const dbcon_url: any = envconfig?.MONGO_URI && DecryptData(envconfig.MONGO_URI);

export class MongoService {
  static async collectionDetails(type: any) {
    let client = new mongoDB.MongoClient(dbcon_url);
    await client
      ?.connect()
      .then((res) => {
        console.log("dbName : ", res.options.dbName);
      })
      .catch((e) => {
        console.log(e.message);
      });
    let db = client.db(dbConfig.databaseName);
    let collection;
    switch (type) {
      case dbConfig.collection.user_profile:
        collection = db.collection(dbConfig.collection.user_profile);
        break;
      case "user":
        collection = db.collection(dbConfig.collection.user_profile);
        break;
      default:
        break;
    }
    return {
      client: client,
      connection: collection,
    };
  }
}
