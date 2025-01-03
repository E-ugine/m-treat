import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/AuthSlice"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { email, password };

    try {
      const response = await fetch("/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setToken(data.access)); // Store token in Redux
        alert("Login successful!");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.detail || "Invalid email or password.");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10">
        <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full max-w-md">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="px-6 py-8 md:px-8 md:py-10">
                <div className="text-center">
                  <h4 className="mb-6 text-xl font-semibold">
                    Welcome Back to M-TREAT
                  </h4>
                </div>

                <form onSubmit={handleSubmit}>
                  <p className="mb-4 text-center">
                    Please log in to your account
                  </p>

                  {/* Email Input */}
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-neutral-200"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-neutral-800 dark:text-neutral-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Password Input */}
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-neutral-200"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-neutral-800 dark:text-neutral-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* Error Message */}
                  {errorMessage && (
                    <p className="mb-4 text-sm text-red-500">{errorMessage}</p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full rounded-md bg-indigo-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
