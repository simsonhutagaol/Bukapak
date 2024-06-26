import Banner from "@/components/Banner";
import DetailEcommerce from "@/components/DetailEcommerce";
import FeaturedProduct from "@/components/FeaturedProduct";

export default async function Home() {
  return (
    <main className="bg-white">
      <Banner />
      <FeaturedProduct />
      <DetailEcommerce />
    </main>
  );
}
