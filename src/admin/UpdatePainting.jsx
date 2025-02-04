import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { URL, doApiGet, doApiMethod } from "../services/apiService";
import { useNavigate } from "react-router-dom";


function UpdatePainting() {
    const { painting_Id } = useParams();
    const nav = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors }, } = useForm();
    const [painting, setPainting] = useState({ name: '', price: '', desc: '' });

    const updatePaintingFunc = async (_bodyData) => {
        try {
            const url = URL + "/paintings/" + painting_Id;
            await doApiMethod(url, "PUT", _bodyData);
            toast.success("Painting Updated");
            nav("/")
        } catch (error) {
            console.log(error);
        }
    }

    const getPainting = async () => {
        try {
            const url = URL + "/paintings/OnePainting/" + painting_Id;
            const data = await doApiGet(url);
            setPainting(data);
            // Set the default values for form inputs
            setValue('name', data.name);
            setValue('price', data.price);
            setValue('desc', data.desc);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load painting data");
        }
    };

    useEffect(() => {
        getPainting();
    }, []);



    const onSubForm = async (_bodyData) => {
        updatePaintingFunc(_bodyData);

    }

    return (
        <div className=" md:flex w-5/6 mx-auto mb-8 ">
            <div className=' text-center text-base md:text-xl md:w-1/2 p-2 md:h-48'>
                <div>Update Painting</div>
                <img src={painting.image_url} alt="painting" />
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
                            value={painting.name}
                            onChange={(e) => setPainting({ ...painting, name: e.target.value })}
                            required
                        />
                    </div>
                    {errors.name && (
                        <div className="text-sm text-red-600">
                            * Enter valid username(min 3 chars)
                        </div>
                    )}
                </div>


                {/* Price */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm">Price <span className='text-gray-500 text-xs'>(required)</span></label>
                    <div className="mt-1">
                        <input
                            {...register("price", { required: true, minLength: 2 })}
                            className="block w-full pl-12 p-2 border border-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                            type="text"
                            value={painting.price}
                            onChange={(e) => setPainting({ ...painting, price: e.target.value })}
                            required
                        />
                    </div>
                    {errors.price && (
                        <div className="text-sm text-red-600">
                            * Enter valid username(min 3 chars)
                        </div>
                    )}
                </div>
                {/* Description */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm">Description <span className='text-gray-500 text-xs'>(required)</span></label>
                    <div className="mt-1">
                        <input
                            {...register("desc", { required: true, minLength: 2 })}
                            className="block w-full pl-12 p-2 border border-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                            type="text"
                            value={painting.desc}
                            onChange={(e) => setPainting({ ...painting, desc: e.target.value })}
                            required
                        />
                    </div>
                    {errors.desc && (
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

export default UpdatePainting