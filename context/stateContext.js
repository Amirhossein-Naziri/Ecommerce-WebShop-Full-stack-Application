import React ,  { createContext , useContext , useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart , setShowCart  ] = useState(false);
    const [cartItems , setCartItems] = useState([]);
    const [totalPrice , setTotalPrice] = useState(0);
    const [totalQuantities , setTotalQuantities] = useState(0);
    const [qty , setQty] = useState(1);

    const incQty = () => {
        setQty((prewQty)=> prewQty + 1);
    }


   // a example of jwt code

    const decQty = () => {
        setQty((prevQty)=> {
            if(prevQty - 1 < 1) return 1;
            console.log(prevQty);
            return prevQty - 1;
        })
    }

    const onAdd = (product , quantity) => {
        const checkProuctItems = cartItems.find((item)=> item._id === product._id);

        if(checkProuctItems){
            setTotalPrice((prevTotalPrice)=> prevTotalPrice + product.price * quantity);
            setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities + quantity);

          const  updatedCartItems = cartItems.map((cartProduct)=>{
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity:cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems)

        }else{
            product.quantity = quantity;
 
            setCartItems([...cartItems ,  product ])
            console.log("Add to cart" ,[{...cartItems  , ... product} ]);
        }

        console.log("Add to cart1" ,[...cartItems , { ... product} ]);
        toast.success(`${qty} ${product.name} Added to cart`)

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
            setShowCart
        }}>
        {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);