import { NextRequest, NextResponse } from "next/server";

import { paginationProducts } from "@/db/models/products";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get("limit");
  const searchTerm = searchParams.get("search");
  const limitNumber: number = Number(limit ?? 10);

  const products = await paginationProducts(
    limitNumber,
    searchTerm || undefined
  );

  return NextResponse.json(products, { status: 200 });
};
