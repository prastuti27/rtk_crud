import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./index.css";
import AddItem from "./components/AddItem";
import ListItem from "./components/ListItem";

function App() {
  return (
    <div className="App">
      <AddItem />
      <ListItem />
    </div>
  );
}

export default App;
