import { useState } from "react";

import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { useSignupMutation } from "../store/auth/apiSlice";

import { setUser } from "../store/auth/slice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialSignupValues = { name: "", email: "", password: "" };
  const [formData, setFormData] = useState(initialSignupValues);
  const { name, email, password } = formData;

  const [signup, { isLoading, isError }] = useSignupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await signup({ name, email, password }).unwrap();
      console.log("signup submitted data:", userData);
      localStorage.setItem("accessToken", userData.token);
      localStorage.setItem("refreshToken", userData.user.refreshToken);
      dispatch(setUser({ user: userData.user, token: userData.token }));
      navigate("/profile");
    } catch (error) {
      // console.error("Failed to signup:", error);
      console.error(
        "Failed to signup:",
        error.response ? error.response.data : error
      );
    }
  };

  const location = useLocation();

  const jwt = localStorage.getItem("accessToken");

  if (jwt) {
    return <Navigate to={"/profile"} state={{ from: location }} replace />;
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <h2>Signup</h2>
      {isError && <p>Failed to signup. Check your credentials.</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          placeholder="Name"
          onChange={onChange}
          className="input"
        />
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={onChange}
          className="input"
        />
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={onChange}
          className="input"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </>
  );
};

export default Signup;
