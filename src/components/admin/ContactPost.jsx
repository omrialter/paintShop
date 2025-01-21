import React, { useContext } from 'react';
import { URL, doApiMethod } from "../../services/apiService";
import { MyContext } from "../../context/myContext";


function ContactPost({ date_created, id, name, email, subject, message, checked }) {
    const { render, setRender } = useContext(MyContext);


    const changeCheckBox = async (_id) => {
        try {
            const url = URL + "/contacts/changeIsChecked/" + _id;
            await doApiMethod(url, "PATCH");
            setRender(!render);
        } catch (error) {
            console.log(error);
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    }



    return (
        <div className="p-2 mt-4 px-4 w-full mx-auto lg:w-[30%] border border-black rounded bg-gray-200">
            <div className='flex justify-end'>
                <button className={`p-2 rounded ${checked === true ? 'bg-green-500' : 'bg-red-500'}`} onClick={() => changeCheckBox(id)} >Read? {checked === false ? "No" : "Yes"}</button>
            </div>
            <div className="text-center"> {formatDate(date_created)}</div>
            <div><span className='font-bold'>Name:</span> {name}</div>
            <div><span className='font-bold'>Email:</span> {email}</div>
            <div><span className='font-bold'>Subject:</span> {subject}</div>
            <div className=' text-center break-words'><span className='font-bold'>Message:</span>
                <br></br>
                <hr></hr>
                <div className='p-1'>{message}</div>
            </div>



        </div>
    )
}

export default ContactPost