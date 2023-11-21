import { useDispatch, useSelector } from "react-redux"
import { twMerge } from "tailwind-merge"
import { openDrawer } from "../../../redux/features/utils/utilsSlice"

export const PrimaryButton = ({ children, className, ...props }) => {
  return (
    <button {...props}
      className={twMerge("bg-primary text-white px-4 py-2 w-full text-[16px] font-[600] uppercase", className)}>
      {children}
    </button>
  )
}
export const DrawerButton = ({ className }) => {
  const dispatch = useDispatch()
  const { drawer } = useSelector(state => state.utils)
  return (
    <label htmlFor="my-drawer-2" className={twMerge("  px-4 py-2 w-full text-[16px] font-[600] uppercase text-center", className)}>
      <svg
        onClick={() => dispatch(openDrawer(!drawer))}
        aria-label="Main Menu"
        aria-haspopup="true"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-pointer icon icon-tabler icon-tabler-menu"
        width={30}
        height={30}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" />
        <line x1={4} y1={8} x2={20} y2={8} />
        <line x1={4} y1={16} x2={20} y2={16} />
      </svg>
    </label>
  )
}