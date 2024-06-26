import Link from "next/link";
import { redirect } from "next/navigation";
import ClientFlashComponent from "../../components/ClientFlashComponent";
import { cookies } from "next/headers";
const RegisterPage = () => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");

  const handleFormAction = async (formData: FormData) => {
    "use server";

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/users",
      {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          username: formData.get("username"),
          email: formData.get("email"),
          password: formData.get("password"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseJson: { message: string } = await response.json();

    if (!response.ok) {
      let message = responseJson.message;
      return redirect(`/register?error=${message}`);
    }

    return redirect("/login");
  };

  return (
    <>
      {!token ? (
        <>
          <main className="bg-white">
            <section className="flex flex-col items-center justify-center h-screen">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Join and Start Shopping
              </h2>
              <ClientFlashComponent />
              <form
                action={handleFormAction}
                className="border border-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name1"
                    name="name"
                    type="text"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    name="username"
                    type="text"
                    placeholder="User Name"
                  />
                </div>
                <div className="mb-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-6">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-blue-500 hover:text-blue-800"
                  >
                    Login here
                  </Link>
                </div>
              </form>
            </section>
          </main>
        </>
      ) : (
        redirect("/")
      )}
    </>
  );
};

export default RegisterPage;
