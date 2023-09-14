import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RootLayout from "./RootLayout";
import { Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import Cards from "./Cards";
import MovieDetail from "./MovieDetail";
import FavoritesPage from "./FavoritesPage";
import SignUp from "./SignUp/SignUp";
import LogIn from "./LogIn/LogIn";
import ForgetPass from "./ForgetPass/ForgetPass";
import Search from "./Search/Search";
import "./SignUp/SignUpStyle.css";
const App = () => {
  const [users, setUsers] = useState([
    {
      Username: "exampleuser",
      Password: "examplepassword",
    },
  ]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Cards /> },
        { path: "movies/:id", element: <MovieDetail /> },
        { path: "/home", element: <Cards /> },
        { path: "/MyFav", element: <FavoritesPage /> },
        { path: "/SignUp", element: <SignUp addUser={addUser} /> },
        { path: "/Login", element: <LogIn users={users} /> },
        { path: "/Login/SignUp", element: <SignUp addUser={addUser} /> },
        { path: "/SignUp/Login", element: <LogIn users={users} /> },
        { path: "/Login/ForgetPass", element: <ForgetPass /> },
        {
          path: "/LogIn/ForgetPass/SignUp",
          element: <SignUp addUser={addUser} />,
        },
        { path: "/LogIn/ForgetPass/LogIn", element: <LogIn users={users} /> },
        { path: "/Search", element: <Search /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
