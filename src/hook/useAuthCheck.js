import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/features/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch()
  const [authCheck, setAuthCheck] = useState(false)

  useEffect(() => {
    const localAuth = localStorage.getItem('auth')
    const recoverToken = localStorage.getItem('recoverToken')
    if (localAuth) {
      const auth = JSON.parse(localAuth)
      if (auth.accessToken) {
        dispatch(userLogin({ accessToken: auth.accessToken }))
        // remove recoverToken from localStorage
        recoverToken && localStorage.removeItem('recoverToken')
      }
    }
    setAuthCheck(true)
  }, [dispatch, setAuthCheck])

  return authCheck

}