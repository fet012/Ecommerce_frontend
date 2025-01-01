import Swal from "sweetalert2";

const AdminLoginError = ({ message }) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
};

export default AdminLoginError;
