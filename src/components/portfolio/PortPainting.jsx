import React from 'react'

function PortPainting({ name, desc, image_url }) {
    return (
        <div className="relative mt-4 w-full ">
            <img className='text-center' src={image_url} alt={name} />
            <p className='text-sm md:text-base lg:text-xl pt-2'>{name}</p>
            <p className='text-sm md:text-base lg:text-xl text-gray-700' >{desc}</p>
            <br />
            <hr />
        </div>
    )
}

export default PortPainting