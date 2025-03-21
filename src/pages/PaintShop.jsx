import React, { useEffect, useState } from 'react'
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

    useEffect(() => {
        getPaintings(page);

    }, [page]);

    return (
        <div className='lg:flex lg:flex-wrap lg:justify-between w-5/6 mx-auto'>

            {isLoading && <LoadingComp />}

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

            {!isLoading && hasMore && (
                <button
                    onClick={() => setPage(prev => prev + 1)}
                    className="mx-auto my-4 px-6 py-2 bg-gray-800 text-white rounded"
                >
                    Load More
                </button>
            )}
            {isLoading && posts.length > 0 && <LoadingComp />}


        </div>
    );

}

export default PaintShop