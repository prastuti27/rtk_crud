import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../itemSlice";

const AddItem: React.FC = () => {
  const [item, setItem] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addItem({ id: Date.now(), name: item }));
    setItem("");
    console.log(item);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Enter item name"
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItem;
