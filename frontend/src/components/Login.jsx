// login code here
import React, { useState } from "react";
import { useMutation } from "react-query";
import userSignin from "../services/userSignin";
import { useNavigate } from "react-router-dom";

const Login = ({ setShowRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigate();

  const mutation = useMutation(userSignin, {
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
      navigator("/");
    },
    onError: (data) => {
      console.log(data);
    },
  });

  async function handleSignin() {
    mutation.mutate({ email, password });
    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="w-full max-w-md p-8 bg-base-100 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-neutral-content">
          Sign In
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 text-neutral-content"
              htmlFor="email"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              name="email"
              id="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 text-neutral-content"
              htmlFor="password"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              name="password"
              id="password"
              className="input input-bordered w-full"
              placeholder="Enter your password"
            />
          </div>
          {mutation.isError && (
            <p className="text-red-500">{mutation.error.response.data.error}</p>
          )}
          <p className="text-xs">email : john.doe@example.com | password : john12345</p>

          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            onClick={(e) => {
              e.preventDefault();
              handleSignin();
            }}
          >
            {mutation.isLoading ? "Loading.." : "Sign In"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-neutral-content">
          Don't have an account?{" "}
          <a className="text-primary" onClick={() => setShowRegister(true)}>
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
