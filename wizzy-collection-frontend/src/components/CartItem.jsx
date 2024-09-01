import { MdOutlineDelete } from "react-icons/md";
import useCartActions from "../redux/useHooks/useCartActions";
import React, { useEffect, useState } from "react";

const CartItem = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const {cartItems,incrementItem, decrementItem, removeFromCart} = useCartActions();
    // console.log('Cart item in: ', cartItems);
    
    useEffect(()=> {
        let total = 0;
        cartItems.forEach(item => {
            total += item.totalPrice;
        })
        setTotalPrice(total)
        // console.log("Use effect total: ",total)
    },[cartItems]);
    

    const hnadleincrementItem = (item) => {
        incrementItem(item);
    }

    const handleDecrementItem = (item) => {
        decrementItem(item.id);
    }

    const handleRemoveFromCart = (item) => {
        removeFromCart(item.id)
    }


    return (
        <div  style={{width:'100%'}} className="row">
            <div style={{width:'70%'}} className="col-md-6 col-sm-12">
            <ul  style={{listStyle:'none', }}>
                {cartItems.map(item=> (
                    <React.Fragment key={item.id}>
                        { console.log('Cart item in: ', cartItems)}
                        <hr/>
                        <li>
                            <div style={{width: '100%'}} className="d-flex">
                                <img src={item.image} alt={"Product"}
                                style={{width:'100px',height:'100px',borderRadius:'10px',border:'1px solid black'}}/>
                                <div style={{marginLeft:'8px'}}  className="card-body">
                                    <div>
                                        <h4 style={{margin:''}}>{item.title}</h4>
                                        <h5>GHs {item.price}</h5>
                                    </div>
                                    <h2 style={{textAlign:'right',marginRight:'20px'}}>GHS {item.totalPrice}</h2>
                                    <div className="buttons" style={{textAlign:'right'}}>
                                        <button style={{background:'#fff',color:'blue',border:'2px solid blue'}}
                                        onClick={()=>handleDecrementItem(item)}>-</button>
                                        <span style={{padding:'10px'}}>x{item.quantity}</span> 
                                        <button style={{background:'#fff',color:'blue',border:'2px solid blue'}}
                                        onClick={()=>hnadleincrementItem(item)}>+</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <button onClick={() => handleRemoveFromCart(item)} style={{display: 'flex', alignItems: 'center',background:'#fff',color:'blue',border:'NONE'}}><MdOutlineDelete size={20} style={{marginTop:'5px'}}/> REMOVE</button>
                        <hr/>
                    </React.Fragment>
                ))}
            </ul>
            </div>
            <div className="checkout col-md-6 col-sm-12" style={{width:'30%',marginLeft:'',border:'1px solid black',padding:'10px'}} >
                <h1>Check Out</h1>
                <h2>Total: GHS {totalPrice}</h2>
            </div>
        </div>
    );
}

export default CartItem;