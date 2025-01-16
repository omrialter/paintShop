import React from 'react'

function Painting({ name, price, available, image_url }) {
    return (
        <div className="relative mt-4 w-5/6 mx-auto text-center ">
            {(available === false) ?
                <div className='bg-black p-2 text-white absolute right-0 top-0'>
                    SOLD
                </div> : ""}
            <img src={image_url} alt={name} />
            <p className='text-gray-700'>{name}</p>
            <p className='text-gray-700' >{price}</p>
            <br />
            <hr />
        </div>
    )
}

export default Painting