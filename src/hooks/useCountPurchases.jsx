import { useState, useEffect } from "react";
import { doApiGet, URL } from "../services/apiService"


export const useCountPurchases = () => {
    const [countPurchases, setCountPurchases] = useState(0);

    const countUnCheckedPurchases = async () => {
        try {
            const url = URL + "/purchases/count-unchecked"
            const data = await doApiGet(url);
            setCountPurchases(data.count)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        countUnCheckedPurchases()
    }, [])




    return { countPurchases, setCountPurchases };
};
