import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAddUserMutation, useEditUserMutation } from "../services/apiSlice";

interface UserFormState {
  avatar: string;
  name: string;
  lastname: string;
  description: string;
}

interface User {
  id: string;
  avatar: string;
  name: string;
  lastname: string;
  description: string;
}

interface AddUserProps {
  userToEdit: User | null;
  onClose: () => void;
}

const AddUser = ({ userToEdit, onClose }: AddUserProps) => {
  const [addUser, { isLoading, isError }] = useAddUserMutation();
  const [editUser, { isLoading: isEditing, isError: isEditError }] =
    useEditUserMutation();
  const [formData, setFormData] = useState<UserFormState>({
    avatar: "",
    name: "",
    lastname: "",
    description: "",
  });

  React.useEffect(() => {
    if (userToEdit) {
      setFormData({
        avatar: userToEdit.avatar,
        name: userToEdit.name,
        lastname: userToEdit.lastname,
        description: userToEdit.description,
      });
    }
  }, [userToEdit]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (userToEdit) {
        await editUser({ ...userToEdit, ...formData }).unwrap();
      } else {
        await addUser(formData).unwrap();
      }
      setFormData({
        avatar: "",
        name: "",
        lastname: "",
        description: "",
      });
      onClose();
    } catch (err) {
      console.error("Failed to save the user: ", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
        {userToEdit ? "Edit User" : "Add User"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
        />
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Lastname"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
        />
        <button
          type="submit"
          disabled={isLoading || isEditing}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading || isEditing
            ? "Saving..."
            : userToEdit
            ? "Update User"
            : "Add User"}
        </button>
        {(isError || isEditError) && (
          <p className="text-red-500 text-center">
            Error saving user. Please try again.
          </p>
        )}
      </form>
      <button
        onClick={onClose}
        className="mt-4 w-full py-2 px-4 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-700"
      >
        Close
      </button>
    </div>
  );
};

export default AddUser;
