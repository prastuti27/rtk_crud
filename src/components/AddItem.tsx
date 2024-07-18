// AddItem.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../itemSlice";
import TextInput from "./TextInput";

const AddItem = () => {
  const [item, setItem] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addItem({ id: Date.now(), name: item }));
    setItem("");
    console.log(item);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <TextInput
        value={item}
        onChange={setItem}
        placeholder="Enter item name"
        className="w-48"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
      >
        Add Item
      </button>
    </form>
  );
};

export default AddItem;
