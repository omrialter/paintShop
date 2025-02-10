
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

                            <div className='flex' >
                                <div className="w-3/4 flex ">
                                    <img className='h-[140px] w-[140px]' src={item.image_url} />
                                    <div className="ms-2 me-3 text-lg font-semibold">{item.name} </div>
                                    <div className="mt-1 text-sm">{item.desc}</div>
                                </div>


                                <div className="w-1/4 flex items-start justify-between">
                                    <div className="ms-8 text-gray-600 text-lg">{item.price} </div>
                                    <MdDelete className='cursor-pointer text-2xl' onClick={() => {
                                        removeFromCart(item._id);
                                    }} />
                                </div>
                            </div>
                            <hr className="my-2" />
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