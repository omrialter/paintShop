import React, { useEffect, useState } from 'react';
import { URL, doApiGet } from "../../services/apiService";

function ContactPosts() {
    const [posts, setPosts] = useState([]);

    const getContacts = async () => {
        try {
            const url = URL + "/contacts/getAll"
            const data = await doApiGet(url);
            setPosts(data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getContacts()
    }, []);



    return (
        <div>
            <h2 className='text-center'>
                ContactPosts
            </h2>
            {
                posts.map((item) => {
                    return (
                        <div className='p-2 my-2 border border-black w-1/2 mx-auto' key={item._id}>
                            <div>Name: {item.name}</div>
                            <div>Email: {item.email}</div>
                            <div>Subject: {item.subject}</div>
                            <div>Message: {item.message}</div>
                        </div>
                    )
                })
            }


        </div>
    )
}

export default ContactPosts