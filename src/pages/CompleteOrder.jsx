import React, { useContext, useEffect } from 'react'
import { MyContext } from "../context/myContext";
import { useLocation } from 'react-router-dom';
import { URL, doApiGet, doApiMethod } from "../services/apiService";
import { toast } from "react-toastify";


function CompleteOrder() {

    const location = useLocation();
    const { cart, updateCart } = useContext(MyContext);


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (token) {
            console.log("we found the token and we call the complereOrder function")
            completeOrder(token);
        } else {
            console.log("THERE IS NO TOKEN!")
        }

        return () => {
            updateCart([]);
        };


    }, []);



    const completeOrder = async (token) => {
        try {
            const response = await doApiGet(`${URL}/payments/completeOrder?token=${token}`);
            console.log(response);
            if (response === "Payment successfully captured") {
                const all_Ids = { "ids": cart.map(item => item._id) };
                const url = URL + "/paintings/updateAvailability";
                await doApiMethod(url, "PATCH", all_Ids);

            }

            toast.success("Payment successful!");
        } catch (error) {
            console.error("Error completing payment:", error);
            toast.error("Payment failed.");
        }
    };

    return (
        <div className='text-2xl w-5/6 mx-auto'>
            <h2 className='text-center'>Order is complete</h2>
            <h2>The paintings you purchased:</h2>
            {cart.map((item) => {
                return (
                    <div key={item._id} className="mt-4 w-1/2 mx-auto">

                        <img className='text-center' src={item.image_url} alt={item.name} />
                        <p className='text-sm md:text-base lg:text-xl pt-2'>{item.name}</p>
                        <p className='text-sm md:text-base text-gray-700' >{item.desc}</p>
                        <br />
                        <hr />

                    </div>
                )
            })}
        </div>
    )
}

export default CompleteOrder