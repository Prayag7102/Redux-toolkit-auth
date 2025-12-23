import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleRoute = ({ roles, children }) => {
  const user = useSelector((state) => state.auth.user);
  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export default RoleRoute;
