import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const userId = sessionStorage.getItem("userId");
  return userId ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
