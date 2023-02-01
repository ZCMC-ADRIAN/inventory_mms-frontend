import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const token = sessionStorage.getItem("Authorization");
  let auth = { token: token };
  return auth.token ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoute;
