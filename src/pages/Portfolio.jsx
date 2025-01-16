import React, { useEffect, useState } from 'react'
import { URL, doApiGet } from "../services/apiService";
import PortPainting from "../components/portfolio/PortPainting";


function Portfolio() {

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
    }, [])




    return (
        <div className="flex-col justify-items-center w-11/12 md:w-5/6 lg:w-4/6 mx-auto">
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