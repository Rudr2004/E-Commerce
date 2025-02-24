import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    const [message, setMessage] = useState("");
    const [currentOrder, setCurrentOrder] = useState(() => {
        const storedOrder = localStorage.getItem("currentOrder");
        return storedOrder ? JSON.parse(storedOrder) : null;
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });

        setMessage(`${product.name} added to cart!`);
        setTimeout(() => setMessage(""), 2000);
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const buyNow = (product) => {
        setCurrentOrder(product);
        localStorage.setItem("currentOrder", JSON.stringify(product));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, message, buyNow, currentOrder }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
