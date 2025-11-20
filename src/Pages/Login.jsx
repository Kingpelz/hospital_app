import React from "react";
import { useContext } from "react";
import Spinner from "../layout/Spinner";
import { toast } from "react-toastify";
import { storeContext } from "../Context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const {
    apiUrl,
    isLoading,
    setIsLoading,
    showPassword,
    setShowPassword,
    email,
    setIsAuth,
    setEmail,
    password,
    setPassword,
  } = useContext(storeContext);


  const navigate = useNavigate();

  async function submitHandler() {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password: password }),
      });
      const data = await response.json();

      console.log(data);
      if (response.ok) {
        const token = data.access_token;
        localStorage.setItem("hospitalToken", token);
        setIsAuth(true);
        toast.success("Login successful");
        navigate("/dashboard");
        setEmail("");
        setPassword("");
      } else {
        toast.error(`Login failed: ${data.message}`);
      } } catch (error) {
      console.log(error);
      toast.error("Login failed: Network or server error");
    } finally {
      setIsLoading(false);
    }
  }
  if (isLoading) {
    return <Spinner />;
  }

  function toggle() {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  }


  return (
    <>
      <div className="mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">
            Login To our Hospital App today
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Login to start make a reservation for appointment with our expert
            doctors.
          </p>

          <form
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              submitHandler();
            }}
          >
            <p className="text-center text-lg font-medium">
              Create an account with us today
            </p>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  required
                  value={email.trim().toLowerCase()}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gold-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <span
                  className="absolute inset-y-0 end-0 grid place-content-center px-4"
                  onClick={toggle}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white"
            >
              Login
            </button>

            <p className="text-center text-sm text-gray-500">
              Don't Have an account?{" "}
              <Link className="underline" to="/register">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
