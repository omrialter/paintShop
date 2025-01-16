import React, { useEffect, useState } from 'react'
import { URL, doApiGet } from "../services/apiService";
import Painting from "../components/home/Painting";




function Home() {
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
        posts.map((item) => {
            return (
                <Painting
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    size={item.size}
                    price={item.price}
                    image_url={item.image_url}
                    available={item.available}
                />
            )
        })

    )
}

export default Home