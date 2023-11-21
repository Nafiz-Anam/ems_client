const ActiveRoute = (location) => {
  const pathnames = location.pathname.split('/').filter((x) => x);
  const IsActive = location.pathname.startsWith(`/${pathnames[0]}`)
  return IsActive
}
export default ActiveRoute