
import { React, useContext, useEffect } from 'react';

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
        <div>
            <h2 className='text-center text-2xl'>My Cart:</h2>
            {

                cart.map((item) => {
                    return (
                        <div className='flex '>
                            <img className='h-[64px] w-[64px]' src={item.image_url} />
                            <div>{item.name} </div>
                            <div>{item.price}</div>
                            <button onClick={() => {
                                removeFromCart(item._id);
                            }} >Delete</button>
                        </div>
                    )
                })
            }
            <div>Total price : {total}</div>

        </div>
    )
}

export default Cart