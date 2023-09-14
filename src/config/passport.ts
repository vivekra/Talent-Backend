import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import tokenType from "./tokens";
import { MongoService } from "../mongo";
import { ObjectId } from "mongodb";
import dbConfig from "./mongo";
import { envconfig } from "./environment";

const jwtOptions = {
  secretOrKey: envconfig?.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: any, done: any) => {
  try {
    if (payload.type !== tokenType.ACCESS) {
      throw new Error("Invalid token type");
    }
    const user = await MongoService.collectionDetails(dbConfig.collection.user_profile).then((obj: any) => {
      return obj.connection.findOne({ _id: new ObjectId(payload.sub) }).finally(() => {
        obj?.client.close();
      });
    });
    if (!user) {
      done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;
