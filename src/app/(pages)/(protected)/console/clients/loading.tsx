import { FaRegPlusSquare } from "react-icons/fa"

const ClientsLoader = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center font-bold border-b pb-2'>
                <h1 className='font-bold h-[2rem] w-1/4 bg-gray-300 animate-pulse rounded'>
                </h1>
                <button className='flex gap-2 items-center bg-blue-600 rounded-full py-2 px-4'><FaRegPlusSquare /> New Client</button>
            </div>
            <div className='flex justify-between items-center mb-5 w-full'>
                <p className='bg-gray-300 animate-pulse h-[2rem] w-[30%]'></p>
                <p className='bg-gray-300 animate-pulse h-[2.5rem] w-[7rem]'></p>
            </div>
            <div className="border border-slate-400">
                {
                    Array.from({ length: 20 }).map((_, index) => (
                        <div key={index} className='bg-gray-300 animate-pulse w-full h-[2.5rem]  border-b border-slate-400'>
                        </div>
                    ))
                }
            </div>
        </div>)
}

export default ClientsLoader