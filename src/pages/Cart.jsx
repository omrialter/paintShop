
import { React, useContext, useEffect } from 'react';
import { FiX } from "react-icons/fi";
import { MyContext } from "../context/myContext";
import { useNavigate } from "react-router-dom";

function Cart() {
    const nav = useNavigate();
    const { cart, updateCart, total } = useContext(MyContext);

    const removeFromCart = (itemId) => {
        const newCart = cart.filter(item => item._id !== itemId);
        updateCart(newCart);
    };



    useEffect(() => {

        console.log(cart);

    }, [cart])

    return (
        <div className="w-5/6 mx-auto">
            <h2 className='text-3xl mb-8'>SHOPPING CART</h2>

            <hr className="my-2" />
            {

                cart.map((item) => {
                    return (
                        <div className="w-4/6 mx-auto" key={item._id}>
                            <div className="text-lg" > {item.name}</div>
                            <div className='relative flex' >
                                <div className="w-2/3 flex items-start justify-between">
                                    <img className='h-[64px] w-[64px] md:h-[140px] md:w-[140px]' src={item.image_url} />
                                    <div className="ms-1 mt-1 text-sm">{item.desc}</div>
                                    <div className="absolute bottom-0 right-0 md:top-0 md:right-14 text-gray-600 text-lg">${item.price}</div>
                                    <FiX className='absolute top-0 right-0 cursor-pointer text-3xl hover:bg-gray-600 hover:text-white rounded-full' onClick={() => {
                                        removeFromCart(item._id);
                                    }} />

                                </div>
                            </div>
                            <hr className="my-3" />
                        </div>
                    )
                })
            }
            <div className="text-gray-600 text-xl text-center">
                <div>Total price: ${total} </div>

                <button className='duration-200 text-center my-4 text-sm w-[200px] hover:text-white hover:bg-black
                 px-6 py-3 border-2 border-black' onClick={() => {
                        nav("/checkout");
                    }} >CHECKOUT</button>

            </div>


        </div>
    )
}

export default Cart