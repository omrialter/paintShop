import React, { useContext } from 'react';
import { URL, doApiMethod } from "../../services/apiService";
import { MyContext } from "../../context/myContext";
import { GrCheckboxSelected } from "react-icons/gr";
import { ImCheckboxChecked } from "react-icons/im";


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
        <div className="py-2 mt-4 px-4 w-5/6 mx-auto lg:w-[30%] border border-black rounded-md bg-gray-100">

            <div className='flex justify-between'>
                <div className="text-center text-sm"> {formatDate(date_created)}</div>
                <button className={'text-2xl'} onClick={() => changeCheckBox(id)} >{checked === false ? <GrCheckboxSelected /> : <ImCheckboxChecked />}</button>
            </div>
            <div><span className='font-bold'>Name:</span> {name}</div>
            <div><span className='font-bold'>Email:</span> {email}</div>
            <div><span className='font-bold'>Subject:</span> {subject}</div>
            <h2 className="font-bold text-center">Message:</h2>
            <div className='break-words bg-white border border-gray-900 rounded'>
                <div className='p-2'>{message}</div>
            </div>



        </div>
    )
}

export default ContactPost