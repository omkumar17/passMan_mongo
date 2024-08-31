import React from 'react'
import { Link } from 'react-router-dom';

const Button = (props) => {
    return (
        <div className='w-full flex flex-row justify-center my-2'>
            <button type="submit" className='border-2 border-blue-50 w-1/3 mx-auto bg-slate-500 text-white p-2 rounded-full  hover:bg-green-900'>
                {props.value}
            </button>
        </div>
    )
}

export default Button
