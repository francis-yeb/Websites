import React from "react";
import ProductComponent from "./ProductComponent";
import MyCarousel from "./MyCarousel";
import { Container } from "react-bootstrap";

const ProductListing = () => {

    return (
        // <div className="bg-white">
            <div className="ui grid container">
            {/* <div style={{display:'flex',margin:'auto',width:'1000px'}}> */}
                <div className="row" style={{width:'100vw', height: '100%'}}>
                    {/* <MyCarousel/> */}
                    <ProductComponent  />
                </div>
            {/* </div> */}
            </div>    
    );
};

export default ProductListing;
