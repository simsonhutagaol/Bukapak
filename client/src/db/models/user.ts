import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { hashText } from "../utils/hash";
import { Products } from "./products";
export type UserModel = {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
};
export type UserWithWishlist = {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
  wishlists: [Products];
};

export type UserModelCreateInput = Omit<UserModel, "_id">;

const DATABASE_NAME = process.env.DATABASE_NAME;

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getUsers = async () => {
  const db = await getDb();

  const users = (await db
    .collection("User")
    .find()
    .project({ password: 0 })
    .toArray()) as UserModel[];
  // console.log(users, "di users");
  return users;
};

export const createUser = async (user: UserModelCreateInput) => {
  const db = await getDb();
  // console.log(user, "di model");
  const data = {
    name: user.name,
    username: user.username,
    email: user.email,
    password: hashText(user.password),
  };

  const result = await db.collection("User").insertOne(data);

  return result;
};

export const getUserById = async (id: string) => {
  const db = await getDb();
  const user = (await db
    .collection("User")
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: "Wishlist",
          localField: "_id",
          foreignField: "userId",
          as: "wishlists",
        },
      },
      {
        $lookup: {
          from: "Products",
          localField: "wishlists.productId",
          foreignField: "_id",
          as: "wishlists",
        },
      },
      {
        $project: {
          password: 0,
        },
      },
    ])
    .next()) as UserWithWishlist;

  return user;
};

export const getUserByEmail = async (email: string) => {
  const db = await getDb();
  const user = (await db
    .collection("User")
    .findOne({ email: email })) as UserModel;

  return user;
};
