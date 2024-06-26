import { getProductBySlug } from "@/db/models/products";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (
  _request: NextRequest,
  { params }: { params: { slug: string } }
) => {
  const slug = params.slug;
  const product = await getProductBySlug(slug);
  if (!product) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(product);
};
