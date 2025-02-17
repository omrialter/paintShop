
import { React, useContext, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { MyContext } from "../context/myContext";

function Cart() {
    const { cart, updateCart, total } = useContext(MyContext);

    const removeFromCart = (itemId) => {
        const newCart = cart.filter(item => item._id !== itemId);
        updateCart(newCart);
    };



    useEffect(() => {

    }, [cart])

    return (
        <div className="w-5/6 mx-auto">
            <h2 className='text-2xl mb-8'>SHOPPING CART</h2>

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
                                    <div className="absolute bottom-0 right-0 md:top-0 md:right-12 text-gray-600 text-lg">{item.price}</div>
                                    <MdDelete className='absolute top-0 right-0 cursor-pointer text-2xl' onClick={() => {
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
                <div>Subtotal price: ${total} </div>

                <button className='duration-200 text-center my-4 text-sm w-[200px] hover:text-white hover:bg-black
                 px-6 py-3 border-2 border-black'>CHECKOUT</button>

            </div>


        </div>
    )
}

export default Cart