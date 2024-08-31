import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="flex flex-row bg-slate-600 w-full text-white p-3 ">
            <div className="logo font-bold size-[24px] ">
                &lt;PassMan/&gt;
            </div>
            <div className="github">
                <span className="gitimage"><img src="" alt="" /></span>
                <span className="gittext"></span>
            </div>
        </nav>
    )
}

export default Navbar
