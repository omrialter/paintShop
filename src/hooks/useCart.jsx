
import react, { useState, useEffect } from "react";

export const useCart = () => {
    const [showCart, setShowCart] = useState(false);
    let cartt = JSON.parse(localStorage.getItem('paintings_to_cart')) || [];

    const [cart, setCart] = useState(cartt);

    let total = cart.reduce((acc, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return acc + price;
    }, 0).toLocaleString('en-US');

    const updateCart = (newCart) => {
        localStorage.setItem('paintings_to_cart', JSON.stringify(newCart));
        setCart(newCart);
    };


    useEffect(() => {
        if (cart.length > 0) {
            console.log(cart);
            setShowCart(true);
        } else {
            setShowCart(false);
        }

    }, [cart])



    return { showCart, setShowCart, cart, total, updateCart };
}



// import React, { useState, useEffect } from "react";

// export const useCart = () => {
//     const [showCart, setShowCart] = useState(false);
//     const [cart, setCart] = useState(() => {
//         // Initializing state directly from localStorage
//         return JSON.parse(localStorage.getItem('paintings_to_cart')) || [];
//     });

//     const [total, setTotal] = useState(() => {
//         // Initial total calculation
//         return cart.reduce((acc, item) => {
//             const price = parseFloat(item.price.replace('$', ''));
//             return acc + price;
//         }, 0);
//     });

//     useEffect(() => {
//         // Update showCart based on cart's content
//         setShowCart(cart.length > 0);

//         // Recalculate the total when cart changes
//         const newTotal = cart.reduce((acc, item) => {
//             const price = parseFloat(item.price.replace('$', ''));
//             return acc + price;
//         }, 0);

//         setTotal(newTotal);
//     }, [cart]);  // Dependency on cart ensures this runs when cart changes

//     // Function to update the cart in both localStorage and state
//     const updateCart = (newCart) => {
//         localStorage.setItem('paintings_to_cart', JSON.stringify(newCart));
//         setCart(newCart);
//     };

//     return { showCart, setShowCart, cart, setCart: updateCart, total };
// };
