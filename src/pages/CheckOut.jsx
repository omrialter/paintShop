import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from "../context/myContext";
import { useForm } from "react-hook-form";
import { Countries } from '../services/Countries';
import { USA_States } from '../services/States';
import { URL, doApiMethod } from "../services/apiService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"




function CheckOut() {


    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { cart, total, updateCart } = useContext(MyContext);
    const [selectedCountry, setSelectedCountry] = useState('Israel');
    const [selectedState, setSelectedState] = useState("");
    const [isEmailSubmited, setIsEmailSubmited] = useState(false);
    const [isAddressSubmited, setIsAddressSubmited] = useState(false);
    const [checkoutObj, setCheckoutObj] = useState({
        total: total,
        paintings: cart.map((item) => { return item._id })
    });
    const handleCountryChange = (event) => { setSelectedCountry(event.target.value); };
    const handleStateChange = (event) => { setSelectedState(event.target.value); };



    useEffect(() => {
        window.scrollTo(0, 0);
        console.log(cart);
        console.log(checkoutObj);

    }, [isEmailSubmited, isAddressSubmited])


    const onSubmit1 = data => {
        setCheckoutObj(prevState => ({
            ...prevState,
            email: data.email
        }));
        setIsEmailSubmited(true);
    };

    const onSubmit2 = (data2) => {
        setCheckoutObj(prevState => ({
            ...prevState,
            first_name: data2.first_name,
            last_name: data2.last_name,
            address: data2.address,
            city: data2.city,
            state: selectedState,
            country: selectedCountry,
            zip_code: data2.zip_code,
            phone_number: data2.phone_number
        }));
        setIsAddressSubmited(true)
    }

    const validateEmail = (value) => {
        // Regular expression to validate email format
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return regex.test(value) || "Enter a valid email address";
    };



    const removeFromCart = (itemId) => {
        const newCart = cart.filter(item => item._id !== itemId);
        updateCart(newCart);
    };

    const CreateOrder = async () => {
        try {
            const url = URL + "/payments/pay";

            const cartDetails = {
                total: total,
                items: cart.map(item => ({
                    name: item.name,
                    description: item.desc,
                    quantity: 1,
                    value: item.price,

                }))
            };
            localStorage.setItem('checkoutData', JSON.stringify(checkoutObj));
            const data = await doApiMethod(url, "POST", cartDetails);
            if (data) {
                console.log(data);
                window.location.href = data;
            }
        } catch (error) {
            console.error('Error creating order:', error);
            toast.error("Error processing payment.");
        }
    };

    const [scrollY, setScrollY] = useState(0);
    const [targetY, setTargetY] = useState(30);
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const smoothScroll = setInterval(() => {
            setTargetY((prevY) => prevY + (scrollY - prevY) * 0.1);
        }, 30);

        return () => clearInterval(smoothScroll);
    }, [scrollY]);




    return (
        <div className='min-h-[150vh]' style={{ backgroundColor: 'rgb(246, 246, 246)' }}>

            <div className="fixed z-10 top-0 w-full bg-white shadow-sm h-[80px]">
                <div className='py-5 mb-8 w-7/12 mx-auto '>
                    <Link to="/"><h2 className='font-bold text-3xl text-gray-800'> Omri Alter</h2></Link>
                </div>
            </div>


            <div className="md:relative mt-20 pt-4 w-10/12 md:w-8/12 lg:w-7/12 mx-auto md:flex md:justify-between">

                {/* Left div */}

                <div className="md:w-[48%]">

                    {/* div 1 */}
                    <div className="relative mt-4 p-3 bg-white rounded border border-gray-300">

                        <h2 className='text-xl font-medium '>Your Email</h2>

                        {
                            (isEmailSubmited) ? <div className='my-4'>
                                <div>
                                    <button onClick={() => {
                                        setIsEmailSubmited(false);
                                    }} className='absolute top-2 right-2 text-sm font-medium'>EDIT</button>
                                    {checkoutObj.email}
                                </div>

                            </div> :

                                <>

                                    <form onSubmit={handleSubmit(onSubmit1)}>
                                        <label className='text-xs text-gray-600'>EMAIL:</label>
                                        <br />
                                        <input style={{ backgroundColor: 'rgb(246, 246, 246)' }} className='w-full mt-1 h-8 p-5'
                                            type="email" placeholder="Email Address"
                                            {...register("email", { required: true, validate: validateEmail })}
                                        />
                                        {errors.email && <p>Email is required.</p>}
                                        <br />

                                        <div className='w-full text-xs text-gray-400 my-2'>You'll receive receipts and notifications at this email</div>

                                        <button type="submit" className=' text-center text-xs w-full text-white bg-gray-900
                                         px-6 py-5' >CONTINUE</button>

                                    </form>

                                </>
                        }

                    </div>
                    {/* div 2 */}
                    <div className="relative mt-4 p-3 bg-white rounded border border-gray-300">
                        <h2 className='text-2xl text-gray-500'>Delivery</h2>
                        {(() => {
                            if (isEmailSubmited && isAddressSubmited) {
                                return (
                                    <div>
                                        <button onClick={() => setIsAddressSubmited(false)} className='absolute top-2 right-2 text-sm font-medium'>EDIT</button>
                                        <div>SHIPPING</div>
                                        <div className='font-medium'>{checkoutObj.first_name} {checkoutObj.last_name}</div>
                                        <div className="text-gray-500">
                                            <div>{checkoutObj.phone_number}</div>
                                            <div>{checkoutObj.address}</div>
                                            <div>{checkoutObj.city} </div>
                                            <div>{checkoutObj.zip_code}</div>
                                            <div>{checkoutObj.country}</div>
                                        </div>
                                    </div>
                                );
                            } else if (isEmailSubmited && !isAddressSubmited) {
                                return (
                                    <form onSubmit={handleSubmit(onSubmit2)}>
                                        <h2 className='mt-1 font-medium'>Shipping Address</h2>
                                        {/* First & Last Names */}
                                        <div className='flex justify-between mt-4'>
                                            {/* first name */}
                                            <div className="mb-6 w-[49%]">
                                                <label className="block mb-2 text-gray-500 text-xs font-medium">FIRST NAME </label>
                                                <div className="mt-1">
                                                    <input
                                                        {...register("first_name", { required: true, minLength: 2 })}
                                                        className="block w-full p-2 border border-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                                                        type="text"
                                                        placeholder="First Name"
                                                        required
                                                    />
                                                </div>
                                                {errors.first_name && (
                                                    <div className="text-sm text-red-600">
                                                        * Enter valid name(min 2 chars)
                                                    </div>
                                                )}
                                            </div>
                                            {/* Last name */}
                                            <div className="mb-6 w-[49%]">
                                                <label className="block mb-2 text-gray-500 text-xs font-medium">LAST NAME </label>
                                                <div className="mt-1">
                                                    <input
                                                        {...register("last_name", { required: true, minLength: 2 })}
                                                        className="block w-full p-2 border border-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                                                        type="text"
                                                        placeholder="Last Name"
                                                        required
                                                    />
                                                </div>
                                                {errors.last_name && (
                                                    <div className="text-sm text-red-600">
                                                        * Enter valid name(min 3 chars)
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Address */}
                                        <div className="mb-6">
                                            <label className="block mb-2 text-gray-500 text-xs font-medium">ADDRESS </label>
                                            <div className="mt-1">
                                                <input
                                                    {...register("address", { required: true, minLength: 2 })}
                                                    className="block w-full p-2 border border-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                                                    type="text"
                                                    placeholder="Address"
                                                    required
                                                />
                                            </div>
                                            {errors.address && (
                                                <div className="text-sm text-red-600">
                                                    * Enter valid address(min 2 chars)
                                                </div>
                                            )}
                                        </div>

                                        {/* Countries Drop down */}

                                        <div className='mb-6'>
                                            <div>
                                                <select className='block w-full p-2 border border-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100' id="country" value={selectedCountry} onChange={handleCountryChange}>
                                                    {Countries.map((country, index) => (
                                                        <option key={index} value={country}>{country}</option>
                                                    ))}
                                                </select>
                                            </div>

                                        </div>

                                        <div className='flex justify-between'>
                                            {/* Zip code */}
                                            <div className="mb-6 w-[30%]">

                                                <div>
                                                    <input
                                                        {...register("zip_code", { required: true, minLength: 2 })}
                                                        className="block w-full p-2 border border-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                                                        type="text"
                                                        placeholder="Zip Code"
                                                        required
                                                    />
                                                </div>
                                                {errors.zip_code && (
                                                    <div className="text-sm text-red-600">
                                                        * Enter valid Zip code(min 2 chars)
                                                    </div>
                                                )}
                                            </div>
                                            {/* City */}
                                            <div className="mb-6 w-[30%]">

                                                <div >
                                                    <input
                                                        {...register("city", { required: true, minLength: 2 })}
                                                        className="block w-full p-2 border border-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                                                        type="text"
                                                        placeholder="City"
                                                        required
                                                    />
                                                </div>
                                                {errors.city && (
                                                    <div className="text-sm text-red-600">
                                                        * Enter valid City(min 2 chars)
                                                    </div>
                                                )}
                                            </div>
                                            {/* State */}
                                            <div className="mb-6 w-[30%]">
                                                {
                                                    (selectedCountry === 'United States') ?
                                                        <select className='block w-full p-2 border border-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100' id="country" value={selectedState} onChange={handleStateChange}>
                                                            {USA_States.map((state, index) => (
                                                                <option key={index} value={state}>{state}</option>
                                                            ))}
                                                        </select>
                                                        :
                                                        <>
                                                            <div >
                                                                <input
                                                                    {...register("state", { minLength: 2 })}
                                                                    className="block w-full p-2 border border-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                                                                    type="text"
                                                                    placeholder="State"

                                                                />
                                                            </div>
                                                            {errors.state && (
                                                                <div className="text-sm text-red-600">
                                                                    * Enter valid State(min 2 chars)
                                                                </div>
                                                            )}
                                                        </>
                                                }

                                            </div>

                                        </div>
                                        {/* Phone number */}
                                        <div className="mb-6">
                                            <label className="block mb-2 text-gray-500 text-xs font-medium">PHONE NUMBER </label>
                                            <div className="mt-1">
                                                <input
                                                    {...register("phone_number", { required: true, minLength: 8 })}
                                                    className="block w-full p-2 border border-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                                                    type="text"
                                                    placeholder="phone_number"
                                                    required
                                                />
                                            </div>
                                            {errors.phone_number && (
                                                <div className="text-sm text-red-600">
                                                    * Enter valid Phone number(min 8 chars)
                                                </div>
                                            )}
                                        </div>

                                        <button type="submit" className=' text-center text-xs w-full text-white bg-gray-900
                                     px-6 py-5' >CONTINUE</button>

                                    </form>
                                );
                            } else {
                                return (
                                    " "
                                );
                            }
                        })()}
                    </div>
                    {/* div 3 */}
                    <div className="mt-4 p-3 bg-white  rounded border border-gray-300 " >
                        <div className='text-2xl text-gray-500'>Payment</div>

                        {
                            isEmailSubmited && isAddressSubmited && (
                                <div className='flex items-center justify-center'>

                                    <button
                                        className="mt-2 w-full max-w-xs flex items-center justify-center gap-1 py-3 px-6 rounded-md 
                                        bg-[#ffc439] hover:bg-[#ffb600] transition-all 
                                        shadow-md focus:outline-none focus:ring-2 focus:ring-[#003087]"
                                        onClick={() => {
                                            CreateOrder()
                                        }}
                                    >
                                        <div className="relative w-4 h-6 flex items-center">

                                            <span className="absolute top-0 left-[2px] text-[#009cde] font-bold text-2xl">P</span>

                                            <span className="relative text-[#003087] font-bold text-2xl z-10">P</span>
                                        </div>
                                        <span className="text-xl font-semibold leading-none flex items-center">
                                            <span className="text-[#003087]">Pay</span>
                                            <span className="text-[#009cde]">Pal</span>
                                        </span>
                                        <span>Checkout</span>
                                    </button>
                                </div>


                            )
                        }

                    </div>
                </div>

                {/* Right div */}

                <div className="md:w-[48%] mt-4 p-4 rounded border border-gray-300 bg-white self-start"
                    style={{
                        position: "sticky",
                        top: `${targetY}px`,
                        right: "0%", // Adjust as needed
                        // Keep width fixed
                        transition: "transform 0.2s ease-out"
                    }}
                >
                    <div className="text-lg font-medium">Order summary</div>
                    <br />
                    {
                        cart.map((item) => (
                            <div key={item._id} className="w-full">
                                <div className="flex ">
                                    <div className="w-1/3">
                                        <img className='h-[80px] w-[80px]' src={item.image_url} />
                                    </div>
                                    <div className="w-1/3">
                                        <div>{item.name}</div>
                                        <div className='text-sm'>{item.desc}</div>
                                    </div>
                                    <div className="w-1/3 flex justify-end ">
                                        <div className="me-1">${item.price}</div>
                                    </div>
                                </div>
                                <div className="text-xs flex justify-end text-gray-500 cursor-pointer underline" onClick={() => removeFromCart(item._id)}>Remove</div>
                                <hr className="my-2"></hr>
                            </div>
                        ))
                    }
                    <br></br>

                    <div className='flex justify-between'>
                        <div className='font-semibold'>Total:</div>
                        <div className='font-semibold'>${total}</div>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default CheckOut;
