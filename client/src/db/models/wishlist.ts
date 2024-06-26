import { Db, ObjectId } from "mongodb";
import { getDb } from "./user";

export type Wishlist = {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
};

export type InputWishlist = Omit<Wishlist, "_id">;
export const addWishlist = async (wishlist: InputWishlist) => {
  const db = await getDb();
  const data = {
    userId: wishlist.userId,
    productId: wishlist.productId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const result = await db.collection("Wishlist").insertOne(data);

  return result;
};

export const getWishlist = async () => {
  const db = await getDb();
  const wishlist = (await db
    .collection("Wishlist")
    .find()
    .toArray()) as Wishlist[];
  return wishlist;
};

export const deleteWishlist = async (userId: string, productId: string) => {
  const db = await getDb();
  const wishlist = await db.collection("Wishlist").findOneAndDelete({
    userId: new ObjectId(userId),
    productId: new ObjectId(productId),
  });
  // console.log(wishlist, "di model");
  return wishlist;
};
