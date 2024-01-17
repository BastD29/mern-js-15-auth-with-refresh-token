import { useState } from "react";

import { Navigate, useNavigate, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";

import { useLoginMutation } from "../store/auth/apiSlice";

import { setUser } from "../store/auth/slice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, isError }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email, password }).unwrap();
      console.log("login submitted data:", userData);
      localStorage.setItem("accessToken", userData.token);
      localStorage.setItem("refreshToken", userData.user.refreshToken);
      dispatch(setUser({ user: userData.user, token: userData.token }));
      navigate("/profile");
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  const location = useLocation();

  const jwt = localStorage.getItem("accessToken");

  if (jwt) {
    return <Navigate to={"/profile"} state={{ from: location }} replace />;
  }

  return (
    <div>
      <h2>Login</h2>
      {isError && <p>Failed to login. Check your credentials.</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
