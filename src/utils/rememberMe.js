const rememberMe = () => {
  const getUserDetails = (name) => JSON.parse(localStorage.getItem(name));
  const setUserDetails = (name, value) => localStorage.setItem(name, JSON.stringify(value));
  const removeUserDetails = (name) => localStorage.removeItem(name);
  return {
    getUserDetails,
    setUserDetails,
    removeUserDetails
  }
}
export default rememberMe;