import  Login  from "../src/components/Login";
import react, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Registration from "./components/Registration";
import Index from "./components/Index";
import ViewPosts from "./components/ViewPosts";
import PostImage from "./components/PostImage";

function App() {
  useEffect(() => {}, []);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/index" component={Index} />
          <Route exact path="/viewposts" component={ViewPosts} />
          <Route exact path="/postimage" component={PostImage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
