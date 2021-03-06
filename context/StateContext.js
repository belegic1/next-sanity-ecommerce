import React, { createContext, useContext, useState, useEffect } from "react"
import tost from "react-hot-toast"

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)

    let foundProduct;
    let index;

    const incQty = () => {
        setQty((prevQty) => prevQty + 1)
    }
    const decQty = () => {
        if (qty > 1) {
            setQty((prevQty) => prevQty - 1)
        }
            
    }
    
    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id)
        setTotalPrice((prevPrice) => prevPrice + (product.price * quantity))
        setTotalQuantities((prevQty) => prevQty + quantity)
        if (checkProductInCart){

            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id){
                    return {...cartProduct, quantity: cartProduct.quantity + quantity}
                }
            })
            setCartItems(updatedCartItems)
        }
        else {
            product.quantity = quantity
            setCartItems( [...cartItems, {...product}])
        }

        tost.success(`${qty} ${product.name} added to cart`)

    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((item) => item._id === id)

        const addedItems = cartItems.filter(item => item._id !== id)

        if (value === 'inc') {
            let newCartItems = [...addedItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]
            setCartItems(newCartItems)
            setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        }
        else if (value === 'dec') {
            if(foundProduct.quantity > 1) {
                let newCartItems = [...addedItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]
                setCartItems(newCartItems)
                setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price)
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
            }
        }
    }

    const onRemove = product => {
        const newCartItems = cartItems.filter(item => item._id !== product._id)
        setCartItems(newCartItems)
        setTotalPrice(prevTotalPrice => prevTotalPrice - (product.price * product.quantity))
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - product.quantity)
        tost.success(`${product.name} removed from cart`)
    }


    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                setShowCart,
                toggleCartItemQuantity,
                onRemove
            }}
        >
            {children}
        </Context.Provider>
    )

} 

export const useStateContext = () => useContext(Context)