import { useNavigate } from "react-router-dom";
import useCartActions from "../redux/useHooks/useCartActions";
import { BsCart4 } from "react-icons/bs";


const Cart = () => {
    const {cartItems} = useCartActions()
    const navigate = useNavigate();
    const goToCart=() => {
        navigate('/cart');
    }
    return (
        <>
            <div onClick={goToCart} className="cartIcon d-flex flex-shrink-0" 
            style={{ marginLeft:'5px', cursor:'pointer', position:'relative'}}>
                <BsCart4 size={30}/>
                {cartItems.length !== 0 && <div 
                style={{width: '1.5rem',height:'1.5rem',textAlign:'center',position:'absolute',top:'0',right:'-8px',
                borderRadius:'50%',padding:'1px',background:'#0281FA',
                color:'white'}}
                >{cartItems.length}</div>}
            </div>
        </>
    );
}

export default Cart;