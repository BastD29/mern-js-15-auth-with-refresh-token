import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../store/auth/apiSlice";
import { setUser } from "../store/auth/slice";
import { useState } from "react";

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
      localStorage.setItem("token", userData.token);
      dispatch(setUser({ user: userData.user, token: userData.token }));
      // localStorage.setItem("token", userData.accessToken);
      // dispatch(setUser({ user: userData.user, token: userData.accessToken }));
      navigate("/profile");
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <h2>Signup</h2>
      {isError && <p>Failed to login. Check your credentials.</p>}
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

export { Signup };
