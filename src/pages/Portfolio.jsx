import React, { useEffect, useState } from 'react'
import fakePaintings from "../fakeJson";
import PortPainting from "../components/portfolio/PortPainting";


function Portfolio() {

    const [posts, setPosts] = useState([]);

    const doApi = () => {
        setPosts(fakePaintings)
    }

    useEffect(() => {
        doApi();
    }, [])




    return (
        <div className="flex-col justify-items-center w-4/6 mx-auto">
            {posts.map((item) => {
                return (
                    <PortPainting
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        desc={item.desc}
                        price={item.price}
                        image_url={item.image_url}
                        available={item.available}
                    />
                )
            })}
        </div>


    )






}

export default Portfolio