import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { userLogout } from "../../../redux/features/auth/authSlice";


export const Logout = ({ children, className }) => {
  const dispatch = useDispatch()

  const handleLLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to logout !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Logout`
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('auth')
        dispatch(userLogout(undefined))
        Swal.fire({
          icon: 'success',
          title: `LogOut SuccessFull`,
          showConfirmButton: false, timer: 1500
        })
      }
    })
  }
  return (
    <button
      onClick={handleLLogout}
      className={`group ${className}`}>
      {children}
    </button>
  )
}