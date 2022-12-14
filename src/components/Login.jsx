import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import Cookies from "universal-cookie";
import axios from "axios";

const Login = () => {
  const cookies = new Cookies();
  const history = new useHistory();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const Login = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.post("http://localhost:6005/user/login", user);
      console.log("data", data);
      cookies.set("token", data.token);
      alert(data.message);
      history.push("/index");
    } catch (error) {
      console.log("error===", error);
      alert(error.response.data.message);
    }
  };
  const handelChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="login-card">
          <form action="" method="post">
            <legend className="form-type">Log In</legend>
            <input
              className="input-styles"
              type="text"
              name="username"
              placeholder="Username"
              value={user.username}
              required
              onChange={(e) => handelChange(e)}
            />
            <br />
            <input
              className="input-styles"
              type="password"
              name="password"
              value={user.password}
              placeholder="Password"
              required
              onChange={(e) => handelChange(e)}
            />
            <br />
            <button className="btn" onClick={(e) => Login(e)}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
