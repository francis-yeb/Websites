import { BsCart4 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useCartActions from "../redux/useHooks/useCartActions";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slice/CartSlice";

const CartWithItem = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems,incrementItem,decrementItem,removeFromCart } = useCartActions();
    let amount = 0;
    
    const handleCheckOut = () => {
        navigate('/check-out');
    }

    const totalAmount = () => {
        for(let i = 0; i < cartItems.length; i++) {
            if (cartItems && cartItems[i].totalPrice) { // Check if totalPrice exists
                amount += cartItems[i].totalPrice;
            }
        }
        const formatAmount = amount.toFixed(2);
        dispatch(cartActions.totalAmount(formatAmount));
        return formatAmount;
    }

    
    

    const handleIncrement = (item) => {
        incrementItem({id:item.id,price:item.price});
    }
    const handleDecrement = (item) => {
        decrementItem(item.id);
    }
    const handleRemove = (item) => {
        removeFromCart(item.id);
    }

    const renderItems = cartItems.map(item => {
        const { image, price, quantity, totalPrice, title } = item;
        return (
            <div>
                {/* <div  className="col-md-8 col-12"> */}
                    
                    <div className="ui divider"></div>
                    <div className="d-flex">
                        <div>
                        <img style={{display:'block'}} class="ui middle aligned tiny image" src={image}/>
                        </div>
                        <div style={{marginLeft:'5px',}}>
                            <h2 style={{margin:'0'}} className="ui header mb-0">{title}</h2><br/>
                            <h6 className="m-0">Price: {price}</h6>
                            <h5 style={{opacity:0.7}}>In Stock</h5>
                            <h5 style={{fontWeight:'bold',color:"#0281FA"}}>Wizzy Express</h5>
                        </div>
                       <h1 className="ui header" style={{marginLeft:'35px'}}>{totalPrice.toFixed(2)}</h1>
                       <div>
                       </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div onClick={()=>handleRemove(item)} className="remove mb-3">
                            <div class="ui vertical red animated button" tabindex="0">
                                <div class="hidden content">
                                <i class="trash alternate icon"></i>
                                </div>
                                <div class="visible content"> REMOVE </div>
                            </div>
                        </div>
                        <div className="btns">
                            <button onClick={()=>handleDecrement(item)} class="ui blue button">-</button>
                             {quantity} <button onClick={()=>handleIncrement(item)} class="ui blue button">+</button>
                        </div>
                    </div>
                   
                   
                {/* </div> */}
                
            </div>
        );
    });

    return (
        <div className="topPad" style={{paddingBottom:'20px'}}>
            <div className="container">
               <div className="row d-flex">
               <div  className="col-md-8 col-12 border">
               <h1 className="ui header">Cart ({cartItems.length})</h1>
                    {renderItems}

                    <div onClick={()=>navigate('/')} class="ui pink animated button mb-2" tabindex="0">
                        <div class="visible content">CONTINUE SHOPPING</div>
                        <div class="hidden content">
                            <i class="left arrow icon"></i>
                        </div>
                    </div> 
               </div>


               <div  className="col-md-4 col-12 mt-2">
                    <div className="five wide column border">
                        <h4 className="ui header">CART SUMMARY</h4>
                        <div className="ui inverted divider"></div>
                        <h5 className="ui header mt-1 ">Subtotal 
                        <span style={{ display:'flex',justifyContent:'end' }}>GHS {totalAmount()} </span></h5>
                        <div className="ui inverted divider"></div>
                        <p className="mt-1">Here in Wizzy collection items can be 
                            delivered to you within Accra</p>
                        <div className="ui inverted divider"></div>
                        <div style={{ textAlign: 'center', marginTop: '10px' }} onClick={handleCheckOut}>
                            <div style={{ background: '#0281FA', color: 'white', width: '95%' }} 
                            className="ui animated  button" tabIndex="0">
                                <div className="visible content">CHECKOUT</div>
                                <div className="hidden content">
                                GHS {amount}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

               </div>
            </div>
        </div>
    );
}

export default CartWithItem;
