import { redirect } from "next/navigation";
import Link from "next/link";
import { cookies } from "next/headers";
import ClientFlashComponent from "../../components/ClientFlashComponent";
const LoginPage = () => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");

  const handleLogin = async (formData: FormData) => {
    "use server";

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/login",
      {
        method: "POST",
        body: JSON.stringify({
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
      return redirect(`/login?error=${message}`);
    }

    cookies().set("token", responseJson.message, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return redirect("/");
  };
  return (
    <>
      {!token ? (
        <>
          <main className="bg-white">
            <section className="flex flex-col items-center justify-center h-screen">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                welcome back to the place Bukapak{" "}
              </h2>
              <ClientFlashComponent />
              <form
                action={handleLogin}
                className="border border-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
              >
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
                    Login
                  </button>
                  <div className="mt-4 text-sm text-gray-600">
                    Dont have an account?{" "}
                    <Link
                      href="/register"
                      className="text-blue-500 hover:text-blue-800"
                    >
                      Register here
                    </Link>
                  </div>
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

export default LoginPage;
