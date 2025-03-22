import React, { useEffect, useState, useCallback } from 'react'
import { URL, doApiGet } from "../services/apiService";
import Painting from "../components/paintShop/Painting";
import LoadingComp from "../components/LoadingComp";



function PaintShop() {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);





    const getPaintings = async (_page) => {
        setIsLoading(true);
        try {
            const url = `${URL}/paintings/allPaintings?page=${_page}&limit=6`;

            const data = await doApiGet(url);
            console.log("Received Data:", data);
            if (_page === 1) {
                setPosts(data.paintings);
            } else {
                setPosts(prev => [...prev, ...data.paintings]);
            }
            setHasMore(_page < data.totalPages);


        } catch (error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    };


    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
            !isLoading &&
            hasMore
        ) {
            setPage(prev => prev + 1);
        }
    }, [isLoading, hasMore]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);


    useEffect(() => {
        getPaintings(page);

    }, [page]);

    return (
        <div className='lg:flex lg:flex-wrap lg:justify-between w-5/6 mx-auto'>

            {isLoading && page < 2 && <LoadingComp />}

            {posts.map((item) => (
                <Painting
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    image_url={item.image_url}
                    available={item.available}
                />
            ))}


            {isLoading && posts.length > 0 && <LoadingComp />}


        </div>
    );

}

export default PaintShop