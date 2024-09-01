import useCartActions from "../redux/useHooks/useCartActions";
import EmptyCart from '../components/EmptyCart'
import CartWithItem from "../components/CartWithItem";



const CartPage = () => {
    const {showCartState,cartItems} = useCartActions()
    return (
        <>
            {cartItems.length === 0? <EmptyCart/>:<CartWithItem/>}
        </>
    );
}


export default CartPage;