import React, { useEffect } from 'react';
import { SkeletonLoader } from './SkeletonLoader';
import Toast from '../../../utils/toast';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../../redux/features/auth/authSlice';

const StageLoading = ({ children, isLoading, isError, isSuccess, error }) => {

  const { errorToast } = Toast()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      error?.data?.error === "Token Expired Please Login." ?
        (errorToast("Token Expired"), forceLogout()) : errorToast("internal server error")
    }
  }, [isError, error])

  const forceLogout = () => {
    localStorage.removeItem('auth')
    dispatch(userLogout(undefined))
  }

  return (
    <>
      {isLoading ?
        <SkeletonLoader /> :
        isError ? <div className="mt-10 text-red-400 "> something is not right </div> :
          isSuccess ? children :
            <div className="mt-10 text-red-400">
              something unexpected error happened (;
            </div>}
    </>
  );
};

export default StageLoading;