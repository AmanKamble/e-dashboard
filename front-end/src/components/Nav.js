import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = ()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear();
        navigate('/signup')
    }

    return(
        <div className="text-white-600 body-font bg-red-500">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" to="/"><img src="./logo.png" className='logo' alt='logo' /></Link>
        { auth ? 
    <nav className="md:mr-auto text-white  md:ml-4 md:py-1 md:pl-4 md:border-l md:border-white-400	flex flex-wrap items-center  justify-center">
      <h1 className="mr-5  hover:text-white-900"><Link to="/">Products</Link></h1>
      <h1 className="mr-5 hover:text-white-900"><Link to="/add">Add Product</Link></h1>
      <h1 className="mr-5 hover:text-white-900"><Link to="/update">Update Products</Link></h1>
      <h1 className="mr-5 hover:text-white-900"><Link to="/profile">Profile</Link></h1>
      <h1 className="mr-5 hover:text-white-900"><Link onClick={logout} to="/signup">Logout  ( {JSON.parse(auth).name} ) </Link></h1>
    </nav>
    :
    <nav className="md:mr-auto text-white md:ml-4 md:py-1 md:pl-4 md:border-l md:border-white-400	flex flex-wrap items-center text-base justify-center">
    <h1 className="mr-5 text-white-500 hover:text-white-900"><Link to="/signup">SignUp</Link> </h1>
    <h1 className="mr-5 text-white-500 hover:text-white-900"><Link to="/login">Login</Link></h1>
    </nav>
}

  </div>
</div> )
}
export default Nav;