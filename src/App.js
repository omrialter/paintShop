import Router from "../src/routes/Router";
import { MyContext } from "../src/context/myContext";
import { useCountContactMsg } from "./hooks/useCountContactMsg";
import { useAuth } from "./hooks/useAuth";
import { useCart } from "./hooks/useCart";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { useCountPurchases } from "./hooks/useCountPurchases";



function App() {
  const { countPurchases, setCountPurchases } = useCountPurchases();
  const { count, setCount } = useCountContactMsg();
  const { user, loggIn, logOut } = useAuth();
  const { showCart, setShowCart, cart, total, updateCart } = useCart();


  return (
    <MyContext.Provider value={{
      count, setCount, user, loggIn, logOut, showCart, setShowCart, cart, total, updateCart, countPurchases, setCountPurchases
    }}>
      <Router />
      <ToastContainer theme='colored' />

    </MyContext.Provider>
  )
}

export default App;
