import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { URL, TOKEN_KEY, doApiGet, doApiMethod } from "../../services/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function PickedPainting() {

    const nav = useNavigate();
    const { painting_Id } = useParams();
    const [painting, setPainting] = useState({});


    const getPainting = async () => {
        try {
            const url = URL + "/paintings/OnePainting/" + painting_Id;
            const data = await doApiGet(url);
            setPainting(data);
            console.log(data);

        } catch (error) {
            console.log(error);
        }

    };

    const deletePainting = async () => {
        try {
            const url = URL + "/paintings/" + painting_Id;
            const data = await doApiMethod(url, "DELETE");
            if (data.deletedCount > 0) {
                toast.success("Painting has been deleted");
                nav("/")
            }

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getPainting();
    }, []);



    return (
        <div>

            <div className="md:flex w-5/6 mx-auto">

                <h2 className='md:hidden text-5xl font-light mb-8'>{painting.name}</h2>

                <div className="md:w-1/2 relative">
                    {(painting.available === false) ?
                        <div className='bg-black p-2 text-white absolute right-0 top-0'>
                            SOLD
                        </div> : ""}
                    <img src={painting.image_url} />
                </div>

                <div className='md:w-1/2 py-2 md:px-6 '>
                    <h2 className='hidden md:block text-5xl font-light mb-4'>{painting.name}</h2>
                    <div className='text-md text-gray-500 mb-2'>{painting.desc}</div>
                    <div className='text-md text-gray-500 mb-4'>{painting.price}</div>
                    <button className='duration-200 text-center text-xs w-[200px] hover:text-white hover:bg-black
                 px-6 py-3 border-2 border-black'>ADD TO CART</button>
                    <br></br>
                    {localStorage[TOKEN_KEY] &&
                        <>
                            <button className="duration-200 p-2 my-1 w-[100px] border-2 border-black hover:text-white hover:bg-black " onClick={() => deletePainting()} >Delete</button>
                            <br />
                            <button className='duration-200 p-2 w-[100px] border-2 border-black hover:text-white hover:bg-black' onClick={() => nav("/admin/updatePost")}>Update</button>
                        </>
                    }


                </div>


            </div>
            <div className='h-[1px] w-5/6 mx-auto bg-gray-300 my-28'></div>
        </div>
    )
}

export default PickedPainting