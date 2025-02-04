import React, { useEffect, useState, useContext } from 'react';
import { URL, doApiGet } from "../services/apiService";
import { MyContext } from "../context/myContext";
import ContactPost from "./ContactPost";

function ContactPosts() {
    const [posts, setPosts] = useState([]);
    const { count } = useContext(MyContext);

    const getContacts = async () => {
        try {
            const url = URL + "/contacts/getAll"
            const data = await doApiGet(url);
            setPosts(data);
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    }




    useEffect(() => {
        getContacts()

    }, [count]);


    return (
        <div>
            <h2 className='text-center text-2xl '>
                ContactPosts
            </h2>
            <h2 className='text-center text-lg mb-14'>({count} new Posts)</h2>
            <div className='lg:flex lg:flex-wrap lg:gap-4 w-5/6 mx-auto'>

                {
                    posts.map((item) => {
                        return (
                            <ContactPost
                                key={item._id}
                                id={item._id}
                                name={item.name}
                                date_created={item.date_created}
                                email={item.email}
                                subject={item.subject}
                                message={item.message}
                                checked={item.checked}
                            />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default ContactPosts