import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PostDetail from "./pages/PostDetail";

function App() {
  const isLoggedIn = localStorage.getItem("token");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/post/:id"
          element={isLoggedIn ? <PostDetail /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
