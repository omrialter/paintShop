import Router from "../src/routes/Router";
import { MyContext } from "../src/context/myContext";
import { useUserData } from "./hooks/useUserData";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';



function App() {
  const { render, setRender } = useUserData();


  return (
    <MyContext.Provider value={{
      render, setRender
    }}>
      <Router />
      <ToastContainer theme='colored' />

    </MyContext.Provider>
  )
}

export default App;
