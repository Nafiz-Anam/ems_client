const localStorage = () => {
  const removeDetails = (name) => localStorage.removeItem(name);
  const geDetails = (name) => JSON.parse(localStorage.getItem(name));
  const setDetails = (name, value) => localStorage.setItem(name, JSON.stringify(value));
  return {
    geDetails,
    setDetails,
    removeDetails
  }
}
export default localStorage;