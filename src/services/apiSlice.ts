import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: string;
  avatar: string;
  name: string;
  lastname: string;
  description: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://64c89c39a1fe0128fbd5f4a1.mockapi.io/crud/",
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "newexam",
    }),
    addUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: "newexam",
        method: "POST",
        body: newUser,
      }),
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `newexam/${id}`,
        method: "DELETE",
      }),
    }),
    editUser: builder.mutation<User, Partial<User> & { id: string }>({
      query: (user) => ({
        url: `newexam/${user.id}`,
        method: "PUT",
        body: user,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
} = apiSlice;
