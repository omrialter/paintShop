import React from 'react'

function AddPainting({ setIsAddPost }) {



    const handleOverlayClick = (event) => {

        if (event.target.classList.contains("bg-black")) {
            setIsAddPost(false);
        }
    };
    return (
        <div onClick={handleOverlayClick}
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 z-50">
            <div className="flex flex-col items-center justify-center max-w-screen-lg flex-1 px-4 py-8 mx-auto bg-red-300 rounded-xl  ">

                <h2 className='text-center text-2xl'>Add new Painting!!</h2>
                <div
                    onClick={() => setIsAddPost(false)}
                    className="absolute right-0 top-0  h-6 border border-black w-6 cursor-pointer text-center hover:text-gray-500 transition duration-200"
                >X</div>

            </div>
        </div>
    )
}

export default AddPainting