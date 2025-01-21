import React from 'react'

function Painting({ name, price, available, image_url }) {
    return (
        <div className="relative mt-4 px-4 w-full mx-auto text-center lg:w-1/3">
            {(available === false) ?
                <div className='bg-black p-2 text-white absolute right-0 top-0'>
                    SOLD
                </div> : ""}
            <img className='mx-auto' src={image_url} alt={name} />
            <p className='text-gray-700'>{name}</p>
            <p className='text-gray-700' >{price}</p>
            <br />
            <hr className='lg:hidden' />
        </div>
    )
}

export default Painting