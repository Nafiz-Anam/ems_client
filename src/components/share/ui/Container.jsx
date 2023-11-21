import { twMerge } from "tailwind-merge"


const Container = ({ children, className }) => {
  return (
    <div className={twMerge("mx-auto flex flex-col w-full  px-4 md:px-8", className)} >
      {children}
    </div>
  )
}
export default Container