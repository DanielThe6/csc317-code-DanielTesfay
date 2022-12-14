import React, { useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

const PostImage = () => {
  const cookies = new Cookies();
  const [post, setPost] = useState({
    title: "",
    title: "",
    description: "",
    policy: 'false',
    image: null,
    createdAt: new Date(),
    createdBy: cookies?.get("token")
      ? jwt_decode(cookies?.get("token"))?.username
      : "",
  });

  const handelChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handelImage = (e) => {
    console.log("image====", e.target.files[0]);
    setPost({ ...post, [e.target.name]: e.target.files[0] });
  };

  const handelCheckBox = (e) => {
    console.log("value==", e.target.name);
    setPost({ ...post, [e.target.name]: e.target.checked });
  };

  const handelSubmit = async (e) => {
    if (post.createdBy === "") {
      alert("please login first");
      return;
    }
    e.preventDefault();
    if (post.title === "") {
      alert("please enter post title");
      return;
    }
    if (post.description === "") {
      alert("please enter post description");
      return;
    }
    if (post.image === null) {
      alert("please select post image");
      return;
    }
    let formData = new FormData();
    formData.append("title", post.title);
    formData.append("description", post.description);
    formData.append("image", post.image);
    formData.append("policy", post.policy);
    formData.append("createdAt", post.createdAt);
    formData.append("createdBy", post.createdBy);
    try {
      let { data } = await axios.post(
        "http://localhost:6005/post/addpost",
        formData
      );
      console.log("post added===", data);
      alert(data.message);
    } catch (error) {
      console.log("error===", error);
    }
  };
  return (
    <>
      <NavBar />
      <div class="container">
        <form action="" method="post">
          <legend class="form-type">Post Image</legend>
          <input
            class="input-styles"
            type="text"
            name="title"
            value={post.title}
            placeholder="Enter post title"
            required
            onChange={(e) => handelChange(e)}
          />
          <input
            class="input-styles"
            type="message"
            name="description"
            value={post.description}
            placeholder="Enter description"
            required
            onChange={(e) => handelChange(e)}
          />
          <br />
          <label class="upload-img" for="">
            Uploade your post:{" "}
          </label>
          <input
            class="upload-img"
            type="file"
            name="image"
            required
            onChange={(e) => handelImage(e)}
          />
          <br />
          <span class="upload-img">
            <a href="#"> Accept Acceptable Use Policy </a>
            <input
              class="terms"
              type="checkbox"
              name="policy"
             // checked={post.policy}
              onChange={(e) => handelCheckBox(e)}
            />
          </span>
          <br />
          <button class="btn" onClick={(e) => handelSubmit(e)}>
            Post
          </button>
        </form>
      </div>
    </>
  );
};

export default PostImage;
