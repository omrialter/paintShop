import React, { useEffect, useState, useCallback } from 'react'
import { URL, doApiGet } from "../services/apiService";
import PortPainting from "../components/portfolio/PortPainting";
import LoadingComp from "../components/LoadingComp";

function Portfolio() {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);




    const getPaintings = async (_page) => {
        if (isLoading || !hasMore) return;
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
        getPaintings(page);
    }, [page])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);




    return (
        <div className="flex-col justify-items-center w-11/12 md:w-5/6 lg:w-4/6 mx-auto">
            {isLoading && <LoadingComp />}

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



            {isLoading && posts.length > 0 && <LoadingComp />}

        </div>


    )






}

export default Portfolio