import React, { useEffect, useState } from "react";
import useProductActions from "../redux/useHooks/useProductActions";
import { Link } from "react-router-dom";
import Spinner from '../spinners/Spinner';
import CardSkeleton from "../pages/skeleton/CardSkeleton";
import { GiRunningShoe } from "react-icons/gi";
import { GiBallerinaShoes } from "react-icons/gi";
import { GiAmpleDress } from "react-icons/gi";
import { PiShirtFoldedDuotone } from "react-icons/pi";
import { RxActivityLog, RxAlignBottom } from "react-icons/rx";

const ProductComponent = () => {
    const {products,allProducts} = useProductActions()
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);
    // console.log('products ',products)

    const getProducts = async () => {
        try {
            const fetchedProducts = await allProducts();
                setRows(fetchedProducts)
        } catch (error) {
            setRows([])
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        getProducts()
    },[])

    // if (loading === true) {
    //     return (
    //         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                
    //             {/* <Spinner/> */}
    //             <CardSkeleton/>
    //         </div>
    //     );
    // }

    
    const renderList = rows&&rows.map(product =>{
        const { id, title, price, category, image } = product;
        return (
             
                        
                    <div  className=" col-md-3 col-6  mb-3" key={id} style={{width:''}}>
                         <Link style={{textDecoration:'none'}} to={`/products/${id}`}>
                         <div className="ui link card h-100">
                             <div className="image">
                                 <img style={{ objectFit: "cover", height: "100px" }} src={image} alt={title} />
                             </div>
                             <div className="content">
                                 <div className="header">{title}</div>
                                 <div className="meta price">GHS {price}</div>
                                 <div className="meta">Category: {category}</div>
                             </div>
                         </div>
                         </Link>
                    </div>
                   
                
              
        );
    });


    return (
       <>
            {loading === false ? (
                <>
                     {/* <div className="mb-4">
                        <div className="container filter-btn">
                        <button className="btn btn-primary"><RxActivityLog size={20}/> All Products</button>
                        <button className="btn btn-primary"><PiShirtFoldedDuotone size={20}/> Men Clothings</button>
                        <button className="btn btn-primary"><GiAmpleDress size={20}/> Women Clothings</button>
                        <button className="btn btn-primary"><GiRunningShoe size={20}/> Men Shoes</button>
                        <button className="btn btn-primary"><GiBallerinaShoes size={20}/> Women Shoes</button>
                        </div>
                    </div> */}
                    {renderList}
                </>
                ):(
                <div>
                    <CardSkeleton/>
                </div>
            )}
        </>
    );
};

export default ProductComponent;
