import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import UserPage from "./components/UserPage/UserPage";
import Nav from "./components/Nav/Nav";

import "./App.css";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Nav />
      <div
        style={{
          backgroundColor: "#EEEEEE",
          width: "100vw",
          minHeight: "100vh",
        }}
      >
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/users/:userName" component={UserPage} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
