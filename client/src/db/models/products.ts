import { ObjectId } from "mongodb";
import { getDb } from "./user";

export type Products = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: [string];
  thumbnail: string;
  images: [string];
  createdAt: string;
  updatedAt: string;
};

export const getProducts = async () => {
  const db = await getDb();

  const products = (await db
    .collection("Products")
    .find()
    .toArray()) as Products[];
  return products;
};

export const getProductBySlug = async (slug: string) => {
  const db = await getDb();
  const product = (await db
    .collection("Products")
    .findOne({ slug: slug })) as Products;

  return product;
};

export const paginationProducts = async (
  limit: number,
  searchTerm?: string
) => {
  const db = await getDb();

  if (!limit) {
    limit = 10;
  }

  let query = db.collection("Products").find();

  if (searchTerm) {
    const regex = new RegExp(searchTerm, "i");
    query = query.filter({ name: { $regex: regex } });
  }

  const productsLimit = (await query.limit(limit).toArray()) as Products[];
  return productsLimit;
};
