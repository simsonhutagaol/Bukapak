import {
  addWishlist,
  InputWishlist,
  getWishlist,
  deleteWishlist,
} from "@/db/models/wishlist";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getUserById } from "@/db/models/user";

export const POST = async (request: NextRequest) => {
  const userId: string | null = request.headers.get("x-user-id");
  if (!userId) {
    return NextResponse.json({ message: "firts login" }, { status: 400 });
  }
  const input: {
    productId: string;
  } = await request.json();

  const data: InputWishlist = {
    userId: new ObjectId(userId),
    productId: new ObjectId(input.productId),
  };

  const wishlists = await getWishlist();

  const existsWishlist = wishlists.some(
    (el) => el.productId.equals(data.productId) && el.userId.equals(data.userId)
  );

  if (existsWishlist) {
    return NextResponse.json(
      { message: "the product already exists" },
      { status: 400 }
    );
  }

  const wishlist = await addWishlist(data);

  return NextResponse.json({ message: "success" }, { status: 201 });
};

export const GET = async (request: NextRequest) => {
  const userId: any = request.headers.get("x-user-id");
  const user = await getUserById(userId);
  if (!user) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(user);
};

export const DELETE = async (request: NextRequest) => {
  const userId: any = request.headers.get("x-user-id");

  const input: {
    productId: string;
  } = await request.json();

  const result = await deleteWishlist(userId, input.productId);
  if (!result) {
    return NextResponse.json({ message: "not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "success delete" }, { status: 201 });
};
