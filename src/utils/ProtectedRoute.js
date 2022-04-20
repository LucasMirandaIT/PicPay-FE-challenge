import { useContext } from "react";
import { Navigate } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import AuthContext from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { authenticatedUser } = useContext(AuthContext);

  if (!authenticatedUser) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Navbar />
      <>{children}</>
    </>
  );
};

export default ProtectedRoute;
