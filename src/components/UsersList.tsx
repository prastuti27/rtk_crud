import React, { useState } from "react";
import { useGetUsersQuery, useDeleteUserMutation } from "../services/apiSlice";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import AddUser from "./AddUser";
import DarkModeToggle from "./DarkModeToggle";

interface User {
  id: string;
  avatar: string;
  name: string;
  lastname: string;
  description: string;
}

const UsersList = () => {
  const { data: users = [], isLoading, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isFormVisible, setFormVisible] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete the user: ", error);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormVisible(true);
  };

  const handleCloseForm = () => {
    setEditingUser(null);
    setFormVisible(false);
  };

  const handleShowAddForm = () => {
    setEditingUser(null);
    setFormVisible(true);
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="relative max-w-4xl mx-auto p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleShowAddForm}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Add User
        </button>
        <DarkModeToggle />
      </div>
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <ul className="space-y-4">
        {users.map((user: User) => (
          <li
            key={user.id}
            className="flex items-center p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div className="flex-1">
              <p className="text-xl font-semibold">
                {user.name} {user.lastname}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {user.description}
              </p>
            </div>
            <button
              onClick={() => handleDelete(user.id)}
              className="ml-4 p-2 text-red-500 hover:text-red-600"
            >
              <MdDeleteForever size={24} />
            </button>
            <button
              onClick={() => handleEdit(user)}
              className="ml-4 p-2 text-blue-500 hover:text-blue-600"
            >
              <CiEdit size={24} />
            </button>
          </li>
        ))}
      </ul>
      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <AddUser userToEdit={editingUser} onClose={handleCloseForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
