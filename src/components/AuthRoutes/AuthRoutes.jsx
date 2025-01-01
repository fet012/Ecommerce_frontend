import UserLoginError from "../ErrorMsg/UserLoginError";
import Login from "../Users/Forms/Login";

const AuthRoute = ({ children }) => {
  // GET USER FROM LOCAL STORAGE
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isLoggedIn = user?.token ? true : false;
  if (!isLoggedIn)
    return (
      <>
        <UserLoginError message="Login into your account first" />
        <Login />
      </>
    );
  return <>{children}</>;
};

export default AuthRoute;
