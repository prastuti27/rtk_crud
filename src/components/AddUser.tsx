import React, { useState, ChangeEvent, FormEvent } from "react";
import { useGetUsersQuery, useAddUserMutation } from "../services/apiSlice";

interface UserFormState {
  avatar: string;
  name: string;
  lastname: string;
  description: string;
}

const AddUser = () => {
  const { refetch } = useGetUsersQuery(); // Ensure you have a query hook for fetching users
  const [addUser, { isLoading, isError }] = useAddUserMutation();
  const [formData, setFormData] = useState<UserFormState>({
    avatar: "",
    name: "",
    lastname: "",
    description: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addUser(formData).unwrap();
      setFormData({
        avatar: "",
        name: "",
        lastname: "",
        description: "",
      });
      refetch();
    } catch (err) {
      console.error("Failed to save the user: ", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="avatar"
        value={formData.avatar}
        onChange={handleChange}
        placeholder="Avatar URL"
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        placeholder="Lastname"
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add User"}
      </button>
      {isError && <p>Error adding user. Please try again.</p>}
    </form>
  );
};

export default AddUser;
