import { useState } from "react";


export const useUserData = () => {

  const [render, setRender] = useState(false);



  return { render, setRender };
};
