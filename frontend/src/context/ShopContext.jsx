import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log("Backend URL:", backendUrl)

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');

    const navigate = useNavigate();

    // ================= PRODUCTS =================
    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            if (response.data.success) {
                setProducts(response.data.products.reverse());
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to load products");
        }
    };

    // ================= CART =================
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (!cartData[itemId]) cartData[itemId] = {};
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

        setCartItems(cartData);

        if (token) {
            await axios.post(
                backendUrl + '/api/cart/add',
                { itemId, size },
                { headers: { token } }
            );
        }
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            await axios.post(
                backendUrl + '/api/cart/update',
                { itemId, size, quantity },
                { headers: { token } }
            );
        }
    };

    const getCartAmount = () => {
        let total = 0;
        for (const itemId in cartItems) {
            const product = products.find(p => p._id === itemId);
            if (!product) continue;

            for (const size in cartItems[itemId]) {
                total += product.price * cartItems[itemId][size];
            }
        }
        return total;
    };

    const getCartCount = () => {
        let count = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                count += cartItems[itemId][size];
            }
        }
        return count;
    };

    const getUserCart = async (token) => {
        try {
            const res = await axios.post(
                backendUrl + '/api/cart/get',
                {},
                { headers: { token } }
            );
            if (res.data.success) {
                setCartItems(res.data.cartData);
            }
        } catch (error) {
            toast.error("Failed to load cart");
        }
    };

    // ================= EFFECTS =================
    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (!token && savedToken) {
            setToken(savedToken);
            getUserCart(savedToken);
        }
        if (token) {
            getUserCart(token);
        }
    }, [token]);

    // ================= CONTEXT VALUE =================
    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        getCartAmount,
        getCartCount,
        backendUrl,
        navigate,
        token,
        setToken
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;