import toast from "react-hot-toast";

export const UnAuth = (e) => {
    const value = e?.response;

    if (value?.status) {
        if (value?.status === 401) {
            localStorage.removeItem("authInfo");
            toast.error(
                value?.statusText ? value?.statusText : "Network Error"
            );
            setTimeout(() => {
                window.location.reload(true);
            }, 500);
        } else {
            toast.error(
                value?.statusText ? value?.statusText : "Network Error"
            );
        }
    } else {
        toast.error("Network Error");
    }
};
