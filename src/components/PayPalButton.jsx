import React, { useState } from "react";
import { doApiMethod, URL } from "../services/apiService";

const PayPalButton = ({ total, cart }) => {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        try {
            setLoading(true);
            const url = `${URL}/payments/pay`;

            const cartDetails = {
                total: total,
                items: cart.map((item) => ({
                    name: item.name,
                    description: item.desc,
                    quantity: 1,
                    value: item.price,
                })),
            };

            const response = await doApiMethod(url, "POST", cartDetails);
            if (response) {
                console.log("Redirecting to PayPal:", response);
                window.location.href = response; // Redirect to PayPal approval page
            } else {
                console.error("Error: No PayPal URL received");
            }
        } catch (error) {
            console.error("Error processing PayPal payment:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleCheckout}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
            {loading ? "Redirecting..." : "Pay with PayPal"}
        </button>
    );
};

export default PayPalButton;
