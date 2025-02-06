
import useState from "react";

export const useCart = () => {
    const [showCart, setShowCart] = useState(false);





    return { showCart, setShowCart };
}



