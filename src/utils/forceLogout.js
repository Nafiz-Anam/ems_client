import { useDispatch } from "react-redux";
import { userLogout } from "../redux/features/auth/authSlice";

export const forceLogout = () => {
  const dispatch = useDispatch();
  localStorage.removeItem('auth');
  dispatch(userLogout(undefined));
}