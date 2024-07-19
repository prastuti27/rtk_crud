import React from "react";
import { useGetUsersQuery, useDeleteUserMutation } from "../services/apiSlice";
import { MdDeleteForever } from "react-icons/md";

interface User {
  id: string;
  avatar: string;
  name: string;
  lastname: string;
  description: string;
}

const UsersList: React.FC = () => {
  const { data: users = [], isLoading, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete the user: ", error);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <ul className="space-y-4">
        {users.map((user: User) => (
          <li
            key={user.id}
            className="flex items-center p-4 bg-white shadow-md rounded-lg"
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
              <p className="text-gray-600">{user.description}</p>
            </div>
            <button
              onClick={() => handleDelete(user.id)}
              className="ml-4 p-2 text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <MdDeleteForever size={24} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
