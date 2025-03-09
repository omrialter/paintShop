
import react, { useState, useEffect } from "react";


export const useCart = () => {

    const [showCart, setShowCart] = useState(false);
    let cartt = JSON.parse(localStorage.getItem('paintings_to_cart')) || [];

    const [cart, setCart] = useState(cartt);

    let total = cart.reduce((acc, item) => {
        const price = parseFloat(item.price);
        const quantity = item.quantity || 1; // Handle cases if quantity is not explicitly set
        return acc + price * quantity;
    }, 0).toFixed(2);

    const updateCart = (newCart) => {
        localStorage.setItem('paintings_to_cart', JSON.stringify(newCart));
        setCart(newCart);
    };


    useEffect(() => {
        if (cart.length > 0) {
            setShowCart(true);
        } else {
            setShowCart(false);
        }

    }, [cart])



    return { showCart, setShowCart, cart, total, updateCart };
}



