import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// Import pages
import Landing from "./pages/landing";
import Login from "./pages/login";
import { Overview, Subscription, Workout } from "./pages/dashboard";
import Register from "./pages/register";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* ✅ Wrap everything in AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Overview />} />
            <Route path="/dashboard/subscription" element={<Subscription />} />
            <Route path="/dashboard/workout" element={<Workout />} />
          </Route>
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
