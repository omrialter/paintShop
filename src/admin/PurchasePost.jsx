import React, { useContext } from 'react';
import { URL, doApiMethod } from "../services/apiService";
import { MyContext } from "../context/myContext";
import { GrCheckboxSelected } from "react-icons/gr";
import { ImCheckboxChecked } from "react-icons/im";


function PurchasePost({ date_created, id, first_name, last_name, email, checked, country, state, city, address, zip_code, phone_number, paintings }) {
    const { countPurchases, setCountPurchases } = useContext(MyContext);

    const changeCheckBox = async (_id) => {
        try {
            const url = URL + "/purchases/changeIsChecked/" + _id;
            const data = await doApiMethod(url, "PATCH");
            if (data.checked === false) {
                setCountPurchases(countPurchases + 1);
            } else {
                setCountPurchases(countPurchases - 1);
            }
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
            <div><span className='font-bold'>First Name:</span> {first_name}</div>
            <div><span className='font-bold'>Last Name:</span> {last_name}</div>
            <div><span className='font-bold'>Email:</span> {email}</div>
            <div><span className='font-bold'>Country:</span> {country}</div>
            {(state) ? <div><span className='font-bold'>State:</span> {state}</div>
                : ""}
            <div><span className='font-bold'>City:</span> {city}</div>
            <div><span className='font-bold'>Address:</span> {address}</div>
            <div><span className='font-bold'>ZIP_CODE:</span> {zip_code}</div>
            <div><span className='font-bold'>Phone_number:</span> {phone_number}</div>
            <div>
                <span className='font-bold'>Purchased Paintings:</span>
                <ul className="list-disc pl-5 space-y-2">
                    {paintings?.map((painting) => (
                        <li key={painting._id} className="flex items-center gap-2">
                            <img src={painting.image_url} alt={painting.name} className="w-10 h-10 object-cover rounded" />
                            <span>{painting.name}</span>
                        </li>
                    ))}
                </ul>
            </div>







        </div>
    )
}

export default PurchasePost