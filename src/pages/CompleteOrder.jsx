import React, { useContext, useEffect } from 'react'
import { MyContext } from "../context/myContext";
import { useLocation } from 'react-router-dom';
import { URL, doApiGet, doApiMethod } from "../services/apiService";
import { toast } from "react-toastify";


function CompleteOrder() {

    const location = useLocation();
    const { cart, updateCart } = useContext(MyContext);
    const shippingData = JSON.parse(localStorage.getItem('checkoutData'));


    useEffect(() => {
        console.log(shippingData);
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (token) {
            console.log("we found the token and we call the complereOrder function")
            completeOrder(token);
            makeAPurchase(shippingData);

        } else {
            console.log("THERE IS NO TOKEN!")
        }

        return () => {
            updateCart([]);
            localStorage.setItem('checkoutData', JSON.stringify({}));
        };



    }, []);

    const makeAPurchase = async (body_data) => {
        try {
            const url2 = URL + "/purchases"
            const data = await doApiMethod(url2, "POST", body_data);
            if (data._id) console.log("a new purchase happend");

        } catch (error) {
            console.log(error);
        }
    }



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
        <div className='text-lg w-5/6 mx-auto my-12'>
            <h2 className='text-center text-3xl font-semibold text-gray-800'>🎉 Your Order is Complete! 🎉</h2>
            <p className="text-center text-gray-600 mt-2">Thank you for your purchase, {shippingData.first_name}! Your paintings will be shipped soon.</p>

            <div className='flex flex-col md:flex-row justify-between mt-8'>

                {/*  Left Section - Shipping Details */}
                <div className='md:w-[49%] border border-gray-300 rounded-lg p-6 bg-white shadow-md'>
                    <h3 className='text-xl font-semibold text-gray-800 mb-4'>📦 Shipping Information</h3>

                    <p><strong>Name:</strong> {shippingData.first_name} {shippingData.last_name}</p>
                    <p><strong>Address:</strong> {shippingData.address}, {shippingData.city}, {shippingData.zip_code}</p>
                    <p><strong>Country:</strong> {shippingData.country}</p> {(shippingData.state) ? <div>, {shippingData.state} </div> : ""}
                    <p><strong>Phone:</strong> {shippingData.phone_number}</p>
                    <p><strong>Email:</strong> {shippingData.email}</p>

                    <div className="mt-6 p-4 bg-gray-100 rounded-md text-gray-700">
                        <p className="font-semibold text-red-600">🔍 Double-check your details!</p>
                        <p>If you notice a mistake, please contact me immediately.</p>
                        <p className="mt-2">
                            📧 <strong>Email:</strong>
                            <a href="mailto:omrialter3@gmail.com" className="text-blue-600 hover:underline"> omrialter3@gmail.com</a>
                        </p>
                    </div>
                </div>

                {/* 🖼️ Right Section - Purchased Paintings */}
                <div className='md:w-[49%] border border-gray-300 rounded-lg p-6 bg-white shadow-md mt-6 md:mt-0'>
                    <h3 className='text-xl font-semibold text-gray-800 mb-4'>🎨 Paintings You Purchased</h3>

                    {cart.map((item) => (
                        <div key={item._id} className="mt-4 flex items-center border-b pb-4">
                            <img className='h-20 w-20 rounded-md shadow-sm' src={item.image_url} alt={item.name} />
                            <div className="ml-4">
                                <p className='text-lg font-medium'>{item.name}</p>
                                <p className='text-gray-600 text-sm'>{item.desc}</p>
                            </div>
                        </div>
                    ))}

                    <div className="mt-6 text-lg font-semibold text-gray-800 flex justify-between">
                        <span>Total:</span>
                        <span>${shippingData.total}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CompleteOrder