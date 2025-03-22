import { React, useEffect, useState, useContext } from 'react';
import { MyContext } from "../context/myContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";


function Header() {


    const { user, logOut, count, showCart, cart, total, countPurchases } = useContext(MyContext);
    const location = useLocation();


    const navi = useNavigate();
    const [nav, setNav] = useState(false);


    const userSignOut = () => {
        if (window.confirm("Are you sure you want to log out")) {
            logOut();
        }
    };



    return (
        <header className={`w-5/6 md:mb-14 mx-auto transition-all duration-200 ${nav ? 'pt-44' : 'pt-0'}`}>



            <aside aria-label="Shopping Cart"
                className={showCart && !['/checkout', '/cart', '/completeOrder'].includes(location.pathname) ? "z-20 pointer-events-auto fixed bottom-0 left-0 sm:left-auto w-full sm:w-[120px] sm:top-3 sm:right-3 transition-all duration-300 ease-in-out" : "fixed bottom-[-100%] w-full sm:w-[250px] left-0 sm:left-auto sm:top-3 sm:right-[-100%] transition-all duration-300 ease-in-out"}>
                <button onClick={() => navi('/cart')}
                    className="text-gray-300 hover:text-white items-center justify-between sm:rounded-full px-2 pb-1  h-[60px] bg-black w-full">
                    <span className="sr-only">View cart details</span>
                    <div className="flex justify-center py-1">
                        <TiShoppingCart className="mt-1 me-1 text-base" />
                        <div className="text-sm ms-1">{cart.length} items</div>
                    </div>
                    <div className="font-semibold text-center">${total}</div>
                </button>
            </aside>


            {user ?
                <>
                    <div className={nav ? "text-center absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 " : "absolute top-[-100%] left-1/2 transform -translate-x-1/2 w-1/2"}>
                        <nav className='text-center '>
                            <ul className="flex flex-col pt-4  text-gray-800">
                                <li className='pt-2' onClick={() => setNav(!nav)}>
                                    <Link className='hover:text-black text-gray-500' to='/'>Paint Shop</Link>
                                </li>

                                <li className='pt-2' onClick={() => setNav(!nav)}>
                                    <Link className='hover:text-black text-gray-500' to='/portfolio'>Porfolio</Link>
                                </li>
                                <li className='pt-2' onClick={() => setNav(!nav)}>
                                    <Link className='hover:text-black text-gray-500' to='/admin/contact'>{(count > 0) ? <div>Contacts({count})</div> : "Contacts"}</Link>
                                </li>
                                <li className='pt-2' onClick={() => setNav(!nav)}>
                                    <Link className='hover:text-black text-gray-500' to='/admin/purchases'>{(countPurchases > 0) ? <div>Purchases({countPurchases})</div> : "Purchases"}</Link>
                                </li>
                                <li className='pt-2' onClick={() => userSignOut()}>
                                    <Link className='hover:text-black text-gray-500' to='/'>Log out</Link>
                                </li>

                            </ul>
                        </nav>

                    </div>

                    <div className='relative'>
                        {nav ?
                            <div className='md:hidden h-[1px] bg-gray-300 my-4'></div> : ""
                        }

                        <button
                            onClick={() => setNav(!nav)}
                            className='md:hidden cursor-pointer text-xl text-gray-500 pt-2 mx-auto block bg-transparent border-0 outline-none'
                        >
                            MENU
                        </button>

                        <div className='md:hidden h-[1px] bg-gray-300 mt-4'></div>

                        <div className='mt-12 py-8 '>
                            <h1 className='font-light text-center text-6xl'> OMRI ALTER</h1>
                        </div>
                        <h2 className='text-gray-500 text-lg text-center md:mb-8'>Distinguished Art</h2>

                        <div className='relative flex justify-between items-center h-16'>
                            <nav className='md:flex z-30 hidden  flex-grow justify-center'>
                                <ul className='flex justify-between space-x-3 bg-white w-2/3 px-2'>

                                    <li className='p-2 transition-transform  hover:scale-110'>
                                        <Link className='hover:text-black text-gray-500 ' to='/'>Paint Shop</Link>
                                    </li>

                                    <li className='p-2 transition-transform  hover:scale-110'>
                                        <Link className='hover:text-black text-gray-500' to='/portfolio'>Portfolio</Link>
                                    </li>
                                    <li className=' p-2 transition-transform  hover:scale-110'>
                                        <Link className='hover:text-black text-gray-500' to='/admin/contact'>{(count > 0) ? <div>Contacts({count})</div> : "Contacts"}</Link>
                                    </li>
                                    <li className=' p-2 transition-transform  hover:scale-110'>
                                        <Link className='hover:text-black text-gray-500' to='/admin/purchases'>{(countPurchases > 0) ? <div>Purchases({countPurchases})</div> : "Purchases"}</Link>
                                    </li>
                                    <li className='p-2 transition-transform  hover:scale-110'>
                                        <Link className='hover:text-black text-gray-500 ' to='/admin/addPost'>Add Painting</Link>
                                    </li>
                                    <li className=' p-2 transition-transform  hover:scale-110' onClick={() => userSignOut()}>
                                        <Link className='hover:text-black text-gray-500' to='/'>Log out</Link>
                                    </li>

                                </ul>
                            </nav>

                            <div className='md:inset-x-0 md:absolute md:h-[1px] md:bg-gray-300'></div>
                        </div>

                    </div>

                </>
                :
                <>

                    <div className={nav ? "absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 " : "absolute top-[-100%] left-1/2 transform -translate-x-1/2 w-1/2"}>
                        <nav aria-label="Mobile Navigation" id="mobile-navigation" className='text-center '>
                            <ul className="flex flex-col pt-4 text-gray-800">
                                <li className='pt-2' onClick={() => setNav(!nav)}>
                                    <Link className='hover:text-black text-gray-500' to='/about'>About</Link>
                                </li>
                                <li className='pt-2' onClick={() => setNav(!nav)}>
                                    <Link className='hover:text-black text-gray-500' to='/'>Paint Shop</Link>
                                </li>
                                <li className='pt-2' onClick={() => setNav(!nav)}>
                                    <Link className='hover:text-black text-gray-500' to='/contact'>Contact</Link>
                                </li>
                                <li className='pt-2' onClick={() => setNav(!nav)}>
                                    <Link className='hover:text-black text-gray-500' to='/portfolio'>Porfolio</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className='relative'>

                        {nav ?
                            <div className='md:hidden h-[1px] bg-gray-300 my-4'></div> : ""
                        }

                        <button
                            onClick={() => setNav(!nav)}
                            aria-expanded={nav}
                            aria-controls="mobile-navigation"
                            className='md:hidden cursor-pointer text-xl text-gray-500 pt-2 mx-auto block bg-transparent border-0 outline-none'
                        >
                            MENU
                        </button>

                        <div className='md:hidden h-[1px] bg-gray-300 mt-4'></div>


                        <div className='mt-12 py-8 '>
                            <h1 className='font-light text-center text-6xl'> OMRI ALTER</h1>
                        </div>
                        <h2 className='text-gray-500 text-lg text-center md:mb-8'>Distinguished Art</h2>

                        <div className='relative flex justify-between items-center h-16'>
                            <nav aria-label="Desktop Navigation" className='md:flex z-30 hidden  flex-grow justify-center'>
                                <ul className='flex justify-between space-x-3 bg-white w-2/3 px-2'>
                                    <li className=' p-2 transition-transform  hover:scale-110'>
                                        <Link className='hover:text-black text-gray-500' to='/about'>About</Link>
                                    </li>
                                    <li className='p-2 transition-transform  hover:scale-110'>
                                        <Link className='hover:text-black text-gray-500 ' to='/'>Paint Shop</Link>
                                    </li>
                                    <li className='p-2 transition-transform  hover:scale-110'>
                                        <Link className='hover:text-black text-gray-500' to='/portfolio'>Portfolio</Link>
                                    </li>
                                    <li className=' p-2 transition-transform  hover:scale-110'>
                                        <Link className='hover:text-black text-gray-500' to='/contact'>Contact</Link>
                                    </li>

                                </ul>
                            </nav>
                            <div className='md:inset-x-0 md:absolute md:h-[1px] md:bg-gray-300'></div>

                        </div>

                    </div>
                </>
            }


        </header>
    )
}

export default Header