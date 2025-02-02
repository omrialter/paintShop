import Router from "../src/routes/Router";
import { MyContext } from "../src/context/myContext";
import { useReRender } from "./hooks/useReRender";
import { useAuth } from "./hooks/useAuth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';



function App() {
  const { render, setRender } = useReRender();
  const { user, loggIn, logOut } = useAuth();


  return (
    <MyContext.Provider value={{
      render, setRender, user, loggIn, logOut
    }}>
      <Router />
      <ToastContainer theme='colored' />

    </MyContext.Provider>
  )
}

export default App;
