import { FaRegPlusSquare } from "react-icons/fa"

const UserUsageLoader = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center font-bold border-b pb-2'>
        <h1 className='font-bold h-[2rem] w-1/4 bg-gray-300 animate-pulse rounded'>
        </h1>
        <button className='flex gap-2 items-center bg-blue-600 rounded-full py-2 px-4'><FaRegPlusSquare /> New Month Record</button>
      </div>
      <div className='bg-gray-300 animate-pulse w-full h-[20rem] rounded'>

      </div>
    </div>)
}

export default UserUsageLoader