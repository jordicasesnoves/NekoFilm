import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory, Link } from "react-router-dom";
import { SignUpMutation } from "../graphql/SignUpMutation";
import { Context } from "../Context";
import jwt_decode from "jwt-decode";

export const SignUpPage = () => {
  const { state, setState } = useContext(Context);
  const history = useHistory();

  const [signup, { data, loading, error }] = useMutation(SignUpMutation);

  const [value, setValue] = useState({
    emailValue: "",
    passwordValue: "",
    usernameValue: "",
  });

  const submitForm = (e) => {
    e.preventDefault();
    signup({
      variables: {
        email: value.emailValue,
        password: value.passwordValue,
        username: value.usernameValue,
      },
    })
      .then((res) => {
        const token = res.data.signup;
        localStorage.setItem("token", token);
        setState({ ...state, loggedIn: true, decodedToken: jwt_decode(token) });
        history.push("/");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold my-4 text-center">NekoFilm</h1>
        <h2 className="text-2xl my-4 text-center">Sign Up to NekoFilm</h2>
        <form
          onSubmit={(e) => {
            submitForm(e);
          }}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 tracking-wide"
              htmlFor="username"
            >
              Email
            </label>
            <input
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={value.emailValue}
              onChange={(e) =>
                setValue({ ...value, emailValue: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 tracking-wide"
              htmlFor="username"
            >
              Username
            </label>
            <input
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="username"
              placeholder="Username"
              value={value.usernameValue}
              onChange={(e) =>
                setValue({ ...value, usernameValue: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 tracking-wide"
              htmlFor="password"
            >
              Password
            </label>
            <input
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******"
              value={value.passwordValue}
              onChange={(e) =>
                setValue({ ...value, passwordValue: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white py-2 w-full shadow rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loading ? (
                <p className="font-medium tracking-widest">...</p>
              ) : (
                <p>Sign Up</p>
              )}
            </button>
          </div>
          <div className="text-gray-600 text-center">
            Already have an account?{" "}
            <Link to={"/login"} className="text-indigo-500 hover:underline">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
