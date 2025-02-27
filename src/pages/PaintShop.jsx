import React, { useEffect, useState } from 'react'
import { URL, doApiGet } from "../services/apiService";
import Painting from "../components/paintShop/Painting";





function PaintShop() {
    const [posts, setPosts] = useState([]);


    const getPaintings = async () => {
        try {
            const url = URL + "/paintings/allPaintings"
            const data = await doApiGet(url);
            setPosts(data);

        } catch (error) {
            console.log(error);
        }

    };


    useEffect(() => {
        getPaintings();

    }, []);

    return (

        <div className='lg:flex lg:flex-wrap lg:justify-between w-5/6 mx-auto'>
            {
                posts.map((item) => {
                    return (
                        <Painting
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            price={item.price}
                            image_url={item.image_url}
                            available={item.available}
                        />
                    )
                })
            }
        </div>

    )
}

export default PaintShop