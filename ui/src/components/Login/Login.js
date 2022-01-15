import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../api/User";
//import history from "../../history.js";
import "./Login.css";

function Login({ setisAuthenticated }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", submitHandler);
    return () => {
      form.removeEventListener("submit", submitHandler);
    };
  });
  const changeHandler = (e) => {
    const name = e.target.name;
    switch (name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser({ email, password });
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("token", user.data.token);
      localStorage.setItem("username", user.data.user.firstName);
      localStorage.setItem("roomname", user.data.user._id);
      setisAuthenticated("true");
      history.push("/join");
    } catch (e) {
      alert(e.message);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <form id="loginForm" className="logIn">
      <input
        value={email}
        name="email"
        type="email"
        onChange={changeHandler}
        placeholder="Email"
        className="loginEmail"
        required
      />
      <input
        name="password"
        type="password"
        value={password}
        onChange={changeHandler}
        placeholder="Password"
        className="loginPassword"
        required
      />
      <input type="submit" value="Login" className="submitLogin" />
    </form>
  );
}

export default Login;
