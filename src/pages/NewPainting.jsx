import React, { useRef } from 'react'
import { useForm } from "react-hook-form";
import { URL, doApiMethod, imgToString } from "../services/apiService";
import { toast } from "react-toastify";

function NewPainting() {
    const uploadRef = useRef();

    let img_url;
    const { register, handleSubmit, formState: { errors }, } = useForm();


    const ApiCloudUpload = async () => {
        try {
            const myFile = uploadRef.current.files[0];
            const imgData = await imgToString(myFile);
            const url = URL + "/paintings/cloud";
            const resp = await doApiMethod(url, "POST", { image: imgData });
            console.log(resp.data);
            img_url = resp.data.secure_url;
            console.log(img_url);
        } catch (err) {
            console.log(err);
        }
    };

    const creatNewPainting = async (_bodyData) => {
        try {
            console.log(_bodyData);
            const url = URL + "/paintings";
            _bodyData.image_url = img_url;
            console.log(img_url)
            console.log(_bodyData);
            const data = await doApiMethod(url, "POST", _bodyData);

            if (data._id) {
                toast.success("Painting added");
            }
        } catch (error) {
            console.log(error);
            toast.error("There's a problem");
        }
    }


    const onSubForm = async (_bodyData) => {
        console.log(_bodyData)
        await ApiCloudUpload();
        await creatNewPainting(_bodyData);
    }





    return (
        <div className=" md:flex w-5/6 mx-auto mb-8 ">
            <div className=' text-center text-base md:text-xl md:w-1/2 p-2 md:h-48'>
                Add new Painting
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


                {/* Price */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm">Price <span className='text-gray-500 text-xs'>(required)</span></label>
                    <div className="mt-1">
                        <input
                            {...register("price", { required: true, minLength: 2 })}
                            className="block w-full pl-12 p-2 border border-gray-800 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100"
                            type="text"
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
                            required
                        />
                    </div>
                    {errors.desc && (
                        <div className="text-sm text-red-600">
                            * Enter valid username(min 3 chars)
                        </div>
                    )}
                </div>
                {/* Image */}
                <div className="mb-6">
                    <label className="block mb-2 text-sm">Image<span className='text-gray-500 text-xs'>(required)</span></label>

                    <input
                        ref={uploadRef}
                        type="file"
                        className="cursor-pointer w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />

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

export default NewPainting