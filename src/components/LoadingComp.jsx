import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function LoadingComp() {
    return (
        <div className="w-full flex items-center justify-center h-[100px]">

            <AiOutlineLoading3Quarters className='text-6xl animate-spin' />

        </div>

    )
}

export default LoadingComp