import { useDispatch, useSelector } from "react-redux"
import { GetItemsFromStorage, cartActions } from "../slice/CartSlice";
import useAuthActions from "../useHooks/useAuthActions"
// import { useEffect } from "react";
// import axios from "../../api/axios";
// import useNotificationActions from "./useNotificationActions";

const useCartActions = () => {
    const {user} = useAuthActions();
    const cartItems = useSelector((state) => state.cart.itemList);
    // const cartQuantity = useSelector((state) => state.cart.totalQuantity);
    const {cartQuantity,showCartState,totalPrice} = useSelector((state)=> state.cart)
    // const {totalPrice} = useSelector((state)=> state.cart.showCart)
    
    const JsonLocalstorageCart = localStorage.getItem('cart');
    const locaJsonCartbackToObject = JSON.parse(JsonLocalstorageCart);
    if (user) {
        
            localStorage.setItem("cart", JSON.stringify({
                "items": cartItems,
                "user": user.id
            }));
    } 
    else {
        sessionStorage.setItem("cart",JSON.stringify(cartItems))
    }
        
   
    
    const dispatch = useDispatch();

    const addToCart = ({title,id,image,price}) => {
        dispatch(cartActions.addToCart({
            title,
            id,
            price,
            image
        }));
    
    }

    const showCart = () => {
        dispatch(cartActions.setShowCart())
    }

    const incrementItem = ( {id,price} ) => {
        dispatch(cartActions.addToCart({id,price}));
    };
    
    const decrementItem = (id) => {
        dispatch(cartActions.decrementItem(id));
    }
    const removeFromCart = (id) => {
        dispatch(cartActions.removeFromCart(id));
    }

    return {
        cartQuantity: cartQuantity,
        cartItems: cartItems,
        showCartState: showCartState,
        totalPrice: totalPrice,
        showCart: showCart,
        addToCart: addToCart,
        incrementItem: incrementItem,
        decrementItem: decrementItem,
        removeFromCart: removeFromCart
    }
}


export default useCartActions;