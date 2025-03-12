import React, { useEffect, useState, useContext } from 'react';
import { URL, doApiGet } from "../services/apiService";
import { MyContext } from "../context/myContext";
import ContactPost from "./ContactPost";
import PurchasePost from './PurchasePost';

function PurchasePosts() {
    const [posts, setPosts] = useState([]);
    const { countPurchases } = useContext(MyContext);

    const getPurchases = async () => {
        try {
            const url = URL + "/purchases/getAll"
            const data = await doApiGet(url);
            setPosts(data);
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    }




    useEffect(() => {
        getPurchases()

    }, [countPurchases]);


    return (
        <div>
            <h2 className='text-center text-2xl '>
                Purchases Posts:
            </h2>
            <h2 className='text-center text-lg mb-14'>({countPurchases} new Posts)</h2>
            <div className='lg:flex lg:flex-wrap lg:gap-4 w-5/6 mx-auto'>

                {
                    posts.map((item) => {
                        return (
                            <PurchasePost
                                key={item._id}
                                id={item._id}
                                first_name={item.first_name}
                                last_name={item.last_name}
                                date_created={item.date_created}
                                email={item.email}
                                country={item.country}
                                state={item.state}
                                checked={item.checked}
                                city={item.city}
                                address={item.address}
                                zip_code={item.zip_code}
                                phone_number={item.phone_number}
                            />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default PurchasePosts