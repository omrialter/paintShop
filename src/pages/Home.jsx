import React, { useEffect, useState } from 'react'
import Painting from "../components/home/Painting";
import fakePaintings from "../fakeJson";



function Home() {
    const [posts, setPosts] = useState([]);

    const doApi = () => {
        setPosts(fakePaintings)
    }


    useEffect(() => {
        doApi();

    }, [])

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