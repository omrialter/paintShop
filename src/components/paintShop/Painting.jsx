import React from 'react'
import { Link } from "react-router-dom";

function Painting({ name, price, available, image_url, id }) {
    return (
        <Link className="block lg:w-[32%]" to={`/picked/${id}`}>

            <div className="relative mt-4 w-full mx-auto text-center hover:opacity-80 duration-300 ">

                {(available === false) ?
                    <div className='bg-black p-2 text-white absolute right-0 top-0'>
                        SOLD
                    </div> : ""}

                <img className='mx-auto max-w-full object-contain' src={image_url} alt={name} />
                <p className='text-gray-700'>{name}</p>
                <p className='text-gray-700' >${price}</p>
                <br />
                <hr className='lg:hidden' />

            </div>

        </Link>

    )
}

export default Painting