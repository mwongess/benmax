import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Profile from "../Profile";

const TopNav = () => {
  return (
    <div className="flex justify-between items-center h-full">
      <p className="text-2xl"><HiOutlineMenuAlt3 /></p>
      <Profile/>
    </div>
  )
}

export default TopNav