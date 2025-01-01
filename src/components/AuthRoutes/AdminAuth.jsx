import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLoginError from "../ErrorMsg/AdminLoginError";

const AdminAuth = ({ children }) => {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = admin?.userFound?.isAdmin ? true : false;

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return <AdminLoginError message="ACCESS DENIED, ADMIN ONLY" />;
  }

  return <>{children}</>;
};

export default AdminAuth;
