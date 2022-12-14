import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import NavBar from "./NavBar";

const Registration = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    age:'false',
    privacyrules: 'false',
  });
  const [confirmPassword, setconfirmPassword] = useState("");
  const cookies = new Cookies();
  const history = useHistory();
  
  const handelCheckBox = (e) => {
    console.log("value==", e.target.name);
    setUser({ ...user, [e.target.name]: e.target.checked.toSstring() });
  };

  const handelChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const handelSubmit = async (e) => {
    e.preventDefault();
    if (user.username === "") {
      alert("please enter username");
      return;
    }
    if (user.email === "") {
      alert("please enter email");
      return;
    }
    if (user.password === "") {
      alert("please enter password");
      return;
    }
    if (user.password !== confirmPassword) {
      alert("please confirm password");
      return;
    }

    try {
      let { data } = await axios.post(
        "http://localhost:6005/user/adduser",
        user
      );
      alert(data.message);
      history.push("/");
    } catch (error) {
      console.log("error===", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <form name="regForm" action="" method="post" onsubmit="validator()">
          <legend className="form-type">Register</legend>
          <input
            className="input-styles"
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={(e) => handelChange(e)}
            value={user.username}
          />
          <input
            className="input-styles"
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={(e) => handelChange(e)}
            value={user.email}
          />
          <input
            className="input-styles"
            type="password"
            name="password"
            value={user.password}
            placeholder="Password"
            required
            onChange={(e) => handelChange(e)}
          />
          <input
            className="input-styles"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            required
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
          <br />
          <label className="terms" for="">
            You are 13+ years of age?
          </label>
          <input
            type="checkbox"
            name="age"
            //checked={user.age.replace(/['"]+/g, '')}
            required
            onChange={(e) => handelCheckBox(e)}
          />
          <br />
          <Link className="terms" to="#">
            TOS and Privacy rules
          </Link>
          <input
            className="input"
            type="checkbox"
            name="privacyrules"
            //checked={user.privacyrules.replace(/['"]+/g, '')}
            required
            onChange={(e) => handelCheckBox(e)}
          />
          <br />
          <button className="btn" onClick={(e) => handelSubmit(e)}>
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Registration;
