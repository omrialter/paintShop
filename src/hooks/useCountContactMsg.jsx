import { useState, useEffect } from "react";
import { doApiGet, URL } from "../services/apiService"


export const useCountContactMsg = () => {
  const [count, setCount] = useState(0);

  const countUnChecked = async () => {
    try {
      const url = URL + "/contacts/count-unchecked"
      const data = await doApiGet(url);
      setCount(data.count)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    countUnChecked()
  })




  return { count, setCount };
};
