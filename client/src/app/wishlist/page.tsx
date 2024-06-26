import FetchListWishlist from "@/components/ListWishlist";
import ServerProtectedComponents from "@/components/ServerProtectedComponents";

const Wishlist = () => {
  return (
    <ServerProtectedComponents>
      <FetchListWishlist />
    </ServerProtectedComponents>
  );
};
export default Wishlist;
