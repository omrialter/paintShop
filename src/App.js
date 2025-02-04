import Router from "../src/routes/Router";
import { MyContext } from "../src/context/myContext";
import { useCountContactMsg } from "./hooks/useCountContactMsg";
import { useAuth } from "./hooks/useAuth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';



function App() {
  const { count, setCount } = useCountContactMsg();
  const { user, loggIn, logOut } = useAuth();


  return (
    <MyContext.Provider value={{
      count, setCount, user, loggIn, logOut
    }}>
      <Router />
      <ToastContainer theme='colored' />

    </MyContext.Provider>
  )
}

export default App;
