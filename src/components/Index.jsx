import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";

const Index = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
    try {
      let { data } = await axios.get("http://localhost:6005/post/getposts");
      console.log("get post===", data);
      setPosts(data.posts);
    } catch (error) {
      console.log("error===", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearchFilter = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <NavBar search={search} handleSearchFilter={handleSearchFilter} />
      <div id="show-image" className="img-container">
        <div className="header">
          <h2>
            There are currently{" "}
            <span id="counter" className="counter-color">
              {posts.length}
            </span>{" "}
            images displayed.
          </h2>

          <button className="btn">Render</button>
        </div>
      </div>
      <div className="image-main">
        {posts
          ?.filter((data) => {
            if (search === "") {
              return data;
            } else if (
              data?.title?.toLowerCase()?.includes(search.toLowerCase())
            ) {
              return data;
            }
          })
          .map((item, index) => {
            return (
              <div
                class="gallery"
                key={index}
                onClick={() =>
                  history.push({
                    pathname: "/viewposts",
                    state: item,
                  })
                }
              >
                <div class="gallery-item">
                  <img
                    class="gallery-image"
                    src={"http://localhost:6005" + item.image}
                    alt="img"
                  />
                </div>
                <h2 style={{ marginLeft: "1rem" }}>{item.title}</h2>
              </div>
            );
          })}
      </div>

      <footer>
        <p className="copyright">© Copyright Daniel Tesfay</p>
      </footer>
    </>
  );
};

export default Index;
