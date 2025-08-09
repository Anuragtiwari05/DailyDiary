import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Home from "./pages/home.jsx";
import { UserContext } from "/context/UserContext.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import PostView from './pages/postView.jsx'

export default function App() {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      {/* Redirect logged-in users away from signup/login */}
      <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/home" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />

      {/* Protected route */}
      <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />

      {/* Default route */}
      <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
       <Route path="/create-post" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostView />} />  {/* <-- New route */}
    </Routes>
  );
}
