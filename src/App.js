import Router from "../src/routes/Router";
import { MyContext } from "../src/context/myContext";
import { useReRender } from "./hooks/useReRender";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';



function App() {
  const { render, setRender } = useReRender();


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
