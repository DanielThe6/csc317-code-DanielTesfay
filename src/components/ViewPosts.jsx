import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";

const returnDate = (post) => {
  let commingDate = new Date(post);
  let commingMonth = commingDate.getMonth();
  let months = [
    "Jun",
    "Feb",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return ` ${months[commingMonth]}-${commingDate.getDate()}-
        ${commingDate.getFullYear()}`;
};
const ViewPosts = (props) => {
  const [comment, postComments] = useState([]);
  const [typecomment, setTypecomment] = useState("");
  console.log(props);
  const { state } = props.location;
  console.log(state);

  const getData = async () => {
    try {
      let { data } = await axios.get(
        "http://localhost:6005/post/getpostcomments"
      );
      console.log("get post===", data);
      postComments(data.posts);
    } catch (error) {
      console.log("error===", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (comment === "") {
      alert("please enter comment");
      return;
    }

    try {
      let { data } = await axios.post(
        "http://localhost:6005/post/postcomment",
        {
          postId: state?.postId,
          postcomment: typecomment,
          postedby: state?.createdBy,
        }
      );
      console.log("data", data.savedComment);
      postComments([...comment, data.savedComment]);
      alert(data.message);
    } catch (error) {
      console.log("error===", error);
    }
  };

  const handelChange = (e) => {
    setTypecomment(e.target.value);
  };

  return (
    <>
      <NavBar />
      <section>
        <h1>{state?.title}</h1>
      </section>

      <section>
        <h2>{state?.createdBy}</h2>
      </section>

      <section>
        <h2>{returnDate(state?.createdAt)}</h2>
      </section>

      <section>
        <img
          width="300px"
          src={"http://localhost:6005" + state?.image}
          alt=""
        />
      </section>
      <br />
      <input
        style={{ height: "50px" }}
        type="text"
        placeholder="Enter post comment here"
        onChange={(e) => handelChange(e)}
      />
      <button className="btn" onClick={(e) => handelSubmit(e)}>
        Post Comment
      </button>
      <br />
      <br />
      <h2>All comments</h2>
      {comment
        .filter((d) => d.postId === state.postId)
        .map((item, index) => {
          return (
            <div style={{ marginBottom: "10px" }} key={index}>
              <div>
                <span>{index + 1 + "-"}</span>
                {item.postcomment}
                <span>({item.postedby})</span>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ViewPosts;
