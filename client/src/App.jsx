import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import UserProfile from "./pages/Profile";
import { Signup } from "./pages/Signup";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
