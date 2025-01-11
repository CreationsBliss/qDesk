import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";
import Spinner from "../components/Spinner/Spinner";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {

  const { user, loading } = useContext(AuthContext)
  const location = useLocation()

  if (loading) {
    return <Spinner></Spinner>
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={location.pathname} replace={true} />
};

export default PrivateRoute;