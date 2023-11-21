import { twMerge } from "tailwind-merge"

export const Title = ({ children, className }) => {
  return (
    <h1 className={twMerge("py-3 font-poppins text-xl font-semibold text-blackText lg:text-3xl", className)}>
      {children}
    </h1>
  )
}