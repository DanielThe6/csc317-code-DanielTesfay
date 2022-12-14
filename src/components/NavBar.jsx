import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const NavBar = ({ search, handleSearchFilter }) => {
  const cookies = new Cookies();
  let token = cookies.get("token");
  console.log(token);

  return (
    <nav className="nav-bar">
      <ul
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <li>
            <Link to="/index">Home</Link>
          </li>
          <li>
            {token ? (
              <Link to="/">
                <span onClick={() => cookies.remove("token")}>Logout</span>
              </Link>
            ) : (
              <Link to="/">Login</Link>
            )}
          </li>
          <li>
            <Link to="/registration">Registration</Link>
          </li>
          <li>
            <Link to="/postimage">Post Image</Link>
          </li>
          <li>
            <Link to="/viewposts">View Post</Link>
          </li>
        </div>
        <div>
          <input
            type="search"
            placeholder="Search about posts"
            value={search}
            onChange={(e) => handleSearchFilter(e)}
          />
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
