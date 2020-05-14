import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory, Link } from "react-router-dom";
import { LogInMutation } from "../graphql/LogInMutation";
import { Context, initialSearchState } from "../Context";
import jwt_decode from "jwt-decode";
import { Button } from "../components/Button";

export const LogInPage = () => {
  const { state, setState } = useContext(Context);
  const history = useHistory();

  const [login, { data, loading, error }] = useMutation(LogInMutation);

  const [value, setValue] = useState({
    emailValue: "neko@neko.com",
    passwordValue: "neko",
  });

  const submitForm = (e) => {
    e.preventDefault();

    // Prevent for submitting more than once
    if (loading) return;

    login({
      variables: { email: value.emailValue, password: value.passwordValue },
    })
      .then((res) => {
        const token = res.data.login;
        localStorage.setItem("token", token);

        setState({
          ...initialSearchState,
          loggedIn: true,
          decodedToken: jwt_decode(token),
        });
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        alert("Error line 36 at LogInPage.js: " + err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold my-4 text-center">NekoFilm</h1>
        <h2 className="text-2xl my-4 text-center">Log In to NekoFilm</h2>
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
          <div className="p-3 rounded-md mb-6 bg-yellow-300">
            ⚠️ For <strong>demo purposes</strong>, you can Log In directly with
            this credentials.
          </div>

          <div className="flex items-center justify-between mb-4">
            <Button loading={loading} type="submit" fullWidth color="primary">
              Log In
            </Button>
          </div>
          <div className="text-gray-600 text-center">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-indigo-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
