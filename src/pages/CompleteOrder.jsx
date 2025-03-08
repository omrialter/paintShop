import React, { useEffect } from 'react'

import { useLocation } from 'react-router-dom';
import { URL, doApiGet } from "../services/apiService";
import { toast } from "react-toastify";


function CompleteOrder() {

    const location = useLocation();


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (token) {
            console.log("we found the token and we call the complereOrder function from the ComplereOrder component")
            completeOrder(token);
        } else {
            console.log("THERE IS NO TOKEN OMRI!")
        }
    }, []);



    const completeOrder = async (token) => {
        try {
            const response = await doApiGet(`${URL}/payments/completeOrder?token=${token}`);
            console.log(response);
            toast.success("Payment successful!");
        } catch (error) {
            console.error("Error completing payment:", error);
            toast.error("Payment failed.");
        }
    };

    return (
        <div className='text-2xl'>
            <h2 className='text-center'>Order is complete</h2>
        </div>
    )
}

export default CompleteOrder