import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Profile from "../Profile";
import { SheetLeft } from "../Sheetleft";

const TopNav = () => {
  return (
    <div className="flex justify-between items-center h-full">
      <p className="hidden sm:flex text-2xl cursor-pointer"><HiOutlineMenuAlt3 /></p>
      <SheetLeft />
      <Profile />
    </div>
  )
}

export default TopNav