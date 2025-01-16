import { useEffect, useState, } from "react";
import { TOKEN_KEY, URL, doApiGet } from "../services/apiService";


export const useUserData = () => {

  const [userData, setUserData] = useState({});
  const [render, setRender] = useState(false);



  const doApiUser = async () => {
    try {
      const url = URL + "/users/userInfo";
      const data = await doApiGet(url);
      setUserData(data);

    } catch (error) {
      console.log(error);
    }
  };


  // useEffect(() => {
  //   if (localStorage[TOKEN_KEY]) {
  //     doApiUser();
  //     console.log(render)
  //   }
  // }, [render]);



  const userSignOut = () => {
    if (window.confirm("Are you sure you want to log out")) {
      deleteToken();
    }
  };

  const deleteToken = async () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
      setUserData({});
    } catch (error) {
      console.error("Error deleting token:", error);
    }
  };

  return { userData, userSignOut, render, setRender };
};
