import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./index.css";

import AddUser from "./components/AddUser";
import UsersList from "./components/UsersList";

function App() {
  return (
    <>
      <AddUser />
      <UsersList />
    </>
  );
}

export default App;
