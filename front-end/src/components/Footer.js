import React from 'react';

const Footer = ()=>{
    return(
        <footer className="text-gray-600 border footer body-font bg-red-500 text-white">
            <div className="container  px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                <span className="ml-3 text-xl text-center">E-comm Dashboard</span>
                <p className="text-sm text-white-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">©2022 E-comm Dashboard</p>
            </div>
        </footer>
    )
}

export default Footer