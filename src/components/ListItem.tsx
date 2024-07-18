// ListItem.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { removeItem, updateItem } from "../itemSlice";
import TextInput from "./TextInput";

interface Item {
  id: number;
  name: string;
}

const ListItem = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.items.items);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newName, setNewName] = useState<string>("");

  const handleDelete = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleEditStart = (id: number, currentName: string) => {
    setEditingId(id);
    setNewName(currentName);
  };

  const handleEditChange = (value: string) => {
    setNewName(value);
  };

  const handleEditSave = (id: number) => {
    const updatedItem: Item = {
      id,
      name: newName,
    };
    dispatch(updateItem(updatedItem));
    setEditingId(null);
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-2">List items</h2>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className="py-2 flex items-center justify-center gap-3"
          >
            {editingId === item.id ? (
              <TextInput
                value={newName}
                onChange={handleEditChange}
                className="border rounded"
              />
            ) : (
              <span className="text-gray-800">{item.name}</span>
            )}
            <button
              onClick={() => handleDelete(item.id)}
              className="bg-red-500 text-white p-3 rounded-2xl hover:bg-red-700 focus:outline-none"
            >
              Delete
            </button>
            {editingId === item.id ? (
              <button
                onClick={() => handleEditSave(item.id)}
                className="bg-green-500 text-white p-3 rounded-2xl hover:bg-green-700 focus:outline-none"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEditStart(item.id, item.name)}
                className="bg-blue-500 text-white p-3 rounded-2xl hover:bg-blue-700 focus:outline-none"
              >
                Edit
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListItem;
