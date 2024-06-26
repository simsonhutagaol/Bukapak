import { AddWishlist } from "@/components/AddWishlist";
import { Products } from "@/db/models/products";

export default async function ProductDetail({
  params,
}: {
  params: { slug: string };
}) {
  const fetchProducts = async (slug: string) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + `/api/products/${slug}`,
      {
        cache: "no-store",
      }
    );
    const responseJson: Products = await response.json();

    return responseJson;
  };

  const product = await fetchProducts(params.slug);

  const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <>
      <main className="bg-white">
        <section className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 mt-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                {product.images.slice(0, 5).map((image, index) => (
                  <div
                    key={index}
                    className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg border border-gray-200"
                  >
                    <img
                      src={image}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 p-4 mt-4 mb-4 lg:p-8 border border-gray-200 bg-gray-100 rounded-lg">
              <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-lg lg:text-xl text-gray-700 mb-6">
                {product.excerpt}
              </p>
              <div className="mb-6">
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
                  Details
                </h2>
                <p className="text-gray-700">{product.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-900 font-semibold text-lg lg:text-xl">
                  {formatRupiah(+(product.price as number))}
                </p>
              </div>
              <AddWishlist productId={product._id} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
