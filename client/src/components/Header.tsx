import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const Header = () => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");
  return (
    <header className="bg-gray-200 shadow-md">
      <div className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-gray-800">
            Bukapak
          </Link>

          <div className="flex space-x-4 items-center">
            <Link
              href="/products"
              className="text-gray-600 hover:text-gray-800 transition duration-300"
            >
              Products
            </Link>
            {!token ? (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-800 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-gray-600 hover:text-gray-800 transition duration-300"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/wishlist"
                  className="text-gray-600 hover:text-gray-800 transition duration-300"
                >
                  wishlist
                </Link>
                <form
                  action={async () => {
                    "use server";
                    cookies().get("token") && cookies().delete("token");
                    redirect("/login");
                  }}
                >
                  <button
                    type="submit"
                    className=" rounded bg-red-400 px-2  transition-colors duration-300 hover:bg-blue-400 hover:text-white"
                  >
                    Logout
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
