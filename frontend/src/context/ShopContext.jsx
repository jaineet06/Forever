import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const[search, setSearch] = useState('');
    const[showSearch, setShowSearch] = useState(false);
    const[cartItems, setCartItems] = useState({});
    const[products, setProducts] = useState([])
    const [token, setToken] = useState("")
    const navigate = useNavigate()

    const addToCart = async (itemId, size) => {

        if(!size){
            toast.error("Select a size!")
            return
        }

        let cartCopy = structuredClone(cartItems)

        if(cartCopy[itemId]){
            if(cartCopy[itemId][size]){
                cartCopy[itemId][size] += 1;
            }else{
                cartCopy[itemId][size] = 1;
            }
        }else{
            cartCopy[itemId] = {};
            cartCopy[itemId][size] = 1;
        }
        setCartItems(cartCopy);

        if(token){
            try {
                await axios.post(backendURL + '/api/cart/add', {itemId, size}, {
                    headers : {
                        token
                    }
                })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    } 

    const getTotalAmount = () => {
        let totalAmount = 0

        for(const items in cartItems){
            let itemInfo = products.find((product) => product._id === items)
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0) totalAmount += itemInfo.price * cartItems[items][item]
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }

    const getCartCount = () => {
        let totalCount = 0;

        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalCount+=cartItems[items][item]
                    }
                } catch (error) {
                    console.log(e);
                    toast.error(e.message)
                }
            }
        }
        return totalCount
    }

    const updateCartQuantity = async (itemId, size, quantity) => {
        let cartCpy = structuredClone(cartItems)

        cartCpy[itemId][size] = quantity

        setCartItems(cartCpy)

        try{
        if(token){
            await axios.post(backendURL + '/api/cart/update', {itemId, size, quantity}, {
                headers: {
                    token
                }
            })
        }
        }catch(e){
            console.log(e);
            toast.error(e.message)
        }

    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendURL + '/api/cart/get', {}, {
                headers: {
                    token
                }
            })

            if(response.data.success){
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(e);
            toast.error(e.message)
        }
    }

    // useEffect(() => {
    //     console.log(cartItems);
    // }, [cartItems])

    const getProductData = async () => {
        try {
            const res = await axios.get(backendURL + '/api/product/list')
            if(res.data.success){
                setProducts(res.data.products)
            } else{
                toast.error(res.data.message)
            }           
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
    getProductData()   
    }, [])

    useEffect(() => {
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])

    const value ={
        products, currency, delivery_fee, navigate, getTotalAmount, search, setSearch, updateCartQuantity, showSearch, setShowSearch, addToCart, cartItems, getCartCount, backendURL,
        token, setToken, setCartItems
    }

    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider