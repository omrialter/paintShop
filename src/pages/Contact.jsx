import React from 'react'
import { useForm } from "react-hook-form";
import { URL, doApiMethod } from "../services/apiService";
import { toast } from "react-toastify";

function Contact() {

    const { register, handleSubmit, formState: { errors }, } = useForm();



    const doContactPost = async (_bodyData) => {
        try {
            const url = URL + "/contacts";
            const data = await doApiMethod(url, "POST", _bodyData);
            if (data._id) {
                toast.success("Thank you for contact me I will answer you as fast as I can");
            }
        } catch (error) {

        }
    }


    const onSubForm = (_bodyData) => {
        doContactPost(_bodyData);

    }


    const validateEmail = (value) => {
        // Regular expression to validate email format
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return regex.test(value) || "Enter a valid email address";
    };


    return (
        <div className=" md:flex w-5/6 mx-auto ">
            <div className=' text-center text-base md:text-xl md:w-1/2 p-2 md:h-48'>
                Contact
            </div>
            <form className="md:w-1/2 p-2" onSubmit={handleSubmit(onSubForm)}>
                {/* name */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm">Name <span className='text-gray-500 text-xs'>(required)</span></label>
                    <div className="mt-1">
                        <input
                            {...register("name", { required: true, minLength: 2 })}
                            className="block w-full pl-12 p-2 border border-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                            type="text"
                            required
                        />
                    </div>
                    {errors.name && (
                        <div className="text-sm text-red-600">
                            * Enter valid username(min 3 chars)
                        </div>
                    )}
                </div>

                {/* Email */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm">Email Addres <span className='text-gray-500 text-xs'>(required)</span></label>
                    <div className="mt-1">
                        <input
                            {...register("email", {
                                required: true,
                                validate: validateEmail,
                            })}
                            className="block w-full pl-12 p-2 border border-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                            type="text"
                            required
                        />
                    </div>
                    {errors.email && (
                        <div className="text-sm text-red-600">
                            * Enter a valid email
                        </div>
                    )}
                </div>
                {/* subject */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm">Subject <span className='text-gray-500 text-xs'>(required)</span></label>
                    <div className="mt-1">
                        <input
                            {...register("subject", { required: true, minLength: 2 })}
                            className="block w-full pl-12 p-2 border border-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                            type="text"
                            required
                        />
                    </div>
                    {errors.subject && (
                        <div className="text-sm text-red-600">
                            * Enter valid username(min 3 chars)
                        </div>
                    )}
                </div>
                {/* message */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm">Message <span className='text-gray-500 text-xs'>(required)</span></label>
                    <div className="mt-1">
                        <textarea
                            {...register("message", { required: true, minLength: 2 })}
                            className="block w-full pl-12 p-2 border border-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                            type="text"
                            required
                        />
                    </div>
                    {errors.message && (
                        <div className="text-sm text-red-600">
                            * Enter valid username(min 3 chars)
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-1/3 py-3 font-semibold  transition duration-200 hover:bg-gray-900 hover:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none border-2 border-black"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Contact