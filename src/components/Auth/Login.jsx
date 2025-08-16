import React, { useState } from "react";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    handleLogin(email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="flex flex-col border border-gray-200 rounded-xl px-16 py-12 shadow-2xl bg-white">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex flex-col items-center justify-center space-y-6 w-80"
        >
          <h1 className="font-bold text-3xl text-gray-800 mb-2">Login</h1>

          <div className="w-full space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 ml-2"
            >
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              className="text-gray-800 outline-none bg-gray-50 border-2 font-medium text-lg border-gray-300 focus:border-emerald-500 transition-all duration-200 px-4 py-3 w-full rounded-2xl placeholder-gray-500"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="w-full space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 ml-2"
            >
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              className="text-gray-800 outline-none bg-gray-50 border-2 font-medium text-lg border-gray-300 focus:border-emerald-500 transition-all duration-200 px-4 py-3 w-full rounded-2xl placeholder-gray-500"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="w-full flex items-center justify-between text-sm pt-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <span className="text-gray-700">Remember me</span>
            </label>
            <a
              href="#"
              className="text-emerald-600 hover:text-emerald-800 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <button
            onClick={submitHandler}
            className="text-white outline-none border-none hover:bg-emerald-600 active:bg-emerald-700 bg-emerald-500 font-semibold text-lg px-8 py-3 w-full rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            Log in
          </button>
        </form>
        <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">
            Demo Credentials:
          </h4>
          <div className="text-xs text-gray-600 space-y-1">
            <p>
              <span className="font-medium">Admin:</span> admin@company.com /
              123
            </p>
            <p>
              <span className="font-medium">Employee:</span> e001@company.com /
              123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
