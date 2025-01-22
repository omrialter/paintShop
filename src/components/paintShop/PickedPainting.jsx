import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { URL, doApiGet } from "../../services/apiService";


function PickedPainting() {
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


    useEffect(() => {
        getPainting();
    }, []);



    return (
        <div>

            <div className="relative flex w-5/6 mx-auto">
                {(painting.available === false) ?
                    <div className='bg-black p-2 text-white absolute right-0 top-0'>
                        SOLD
                    </div> : ""}

                <div className="w-1/2">
                    <img src={painting.image_url} />
                </div>

                <div className='w-1/2 py-2 px-6'>
                    <h2 className='text-5xl font-light mb-4'>{painting.name}</h2>
                    <div className='text-md text-gray-500 mb-2'>{painting.desc}</div>
                    <div className='text-md text-gray-500 mb-4'>{painting.price}</div>
                    <button className='duration-200 text-center text-xs w-1/3 hover:text-white hover:bg-black
                 px-6 py-3 border-2 border-black'>ADD TO CART</button>



                </div>


            </div>
            <div className='h-[1px] w-5/6 mx-auto bg-gray-300 my-28'></div>
        </div>
    )
}

export default PickedPainting