import { Container } from "react-bootstrap";
import CartItem from "./CartItem";
import React from "react";


const CartItems = () => {
    return (
        <Container>
            <h2 className="mb-5"> Your Cart</h2>
            <div style={{width:'700px'}} className="cart-items" >
                        <CartItem />
               
            </div>
        </Container>
    );
}

export default CartItems;