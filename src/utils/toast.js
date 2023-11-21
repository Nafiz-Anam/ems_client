import toast from "react-hot-toast";

const Toast = () => {
  const successToast = (message) => {
    toast.success(message, {
      position: "top-right",

    })
  }
  const errorToast = (message) => {
    toast.error(message, { position: "top-center", });
  }
  return { successToast, errorToast }
};

export default Toast;