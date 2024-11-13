import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./commponents/Signup.js";
import Login from "./commponents/Login.js";
import ProtectedRoute from "./commponents/ProtectedRoute.js";
import Dashboard from "./commponents/Dashboard.js";
import Photos from "./commponents/Photos.js";
import Albums from "./commponents/Albums.js";
import Posts from "./commponents/Posts.js";
import Todos from "./commponents/Todos.js";
import Users from "./commponents/Users.js";
import Comments from "./commponents/Comments.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/posts" element={<Posts />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
