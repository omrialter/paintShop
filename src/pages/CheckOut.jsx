import { React, useContext } from 'react';
import { MyContext } from "../context/myContext";

function CheckOut() {
    const { cart, total } = useContext(MyContext);



    return (
        <div>Checkout</div>
    )
}

export default CheckOut
