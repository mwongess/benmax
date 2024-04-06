import React from 'react'

const Message = () => {
    return (
        <div className='text-white'>
            <form className='message w-[40%]'>
                <div>
                    <input type="text" placeholder='Email/Phone' />
                </div>
                <div>
                    <textarea name="" id="" cols={30} rows={10} placeholder='Message'></textarea>
                </div>
                <button className='bg-blue-500 w-fit p-2 rounded'>Send</button>
            </form>
        </div>
    )
}

export default Message