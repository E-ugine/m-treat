import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerPatient, resetState } from "../redux/RegistrationSlice";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState(""); // For password mismatch
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.registration);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Clear error and dispatch the registration action
    setPasswordError("");
    dispatch(registerPatient(formData));
  };

  const handleReset = () => {
    dispatch(resetState());
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
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
                    Sign Up for M-TREAT
                  </h4>
                </div>

                <form onSubmit={handleSubmit}>
                  <p className="mb-4 text-center">
                    Fill in the details below to create your account
                  </p>

                  {/* Name Input */}
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-neutral-200"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-neutral-800 dark:text-neutral-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-neutral-200"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-neutral-800 dark:text-neutral-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="mb-4">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-neutral-200"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-neutral-800 dark:text-neutral-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-neutral-200"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-neutral-800 dark:text-neutral-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                    />
                  </div>

                  {/* Confirm Password Input */}
                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-neutral-200"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-neutral-800 dark:text-neutral-200 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                    />
                    {passwordError && (
                      <p className="text-red-500 text-sm">{passwordError}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-indigo-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {loading ? "Submitting..." : "Sign Up"}
                  </button>
                  {success && <p className="mt-4 text-green-500">{success}</p>}
                  {error && <p className="mt-4 text-red-500">{error}</p>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
