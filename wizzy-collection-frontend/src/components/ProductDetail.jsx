import { useNavigate, useParams } from "react-router-dom";
import useProductActions from "../redux/useHooks/useProductActions";
import { useEffect } from "react";
import Spinner from '../spinners/Spinner';
import useCartActions from "../redux/useHooks/useCartActions";
import useNotificationActions from "../redux/useHooks/useNotificationActions";
import {Container} from 'react-bootstrap';

const ProductDetail = () => {
    const { productId } = useParams();
    const { getProductDetail, singleProductView, removeSelectedProduct } = useProductActions();
    const {addToCart} = useCartActions();
    const {showNotification} = useNotificationActions()
    const navigate = useNavigate();

    useEffect(() => {
        if (productId && productId !== '') {
            getProductDetail(productId);
        }
        return () => {
            removeSelectedProduct();
        };
    }, [productId]);

    if (!singleProductView) {
        return (
            <div className="mt-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spinner/>
            </div>
        );
    }

    const handleAddToCart = (item) => {
        addToCart(item);
        // localStorage.setItem('cart',JSON.stringify(item));
        showNotification({type:'success',message:'item has been added to cart',open:true})
    }

    const { id, title, price, description, category, image } = singleProductView;
    return (
        <>
            <Container>
                <div className="ui grid-12 Container">
                    {Object.keys(singleProductView).length === 0 ? (
                        <div>....Loading</div>
                    ) : (
                        <>
                            <div key={id} style={{ marginTop: '80px' }} className="ui  segment ">
                            <div className="ui two column stackable center aligned grid">
                                <div className="ui vertical divider">AND</div>
                                <div className="middle aligned row">
                                    <div className="column lp">
                                        <img src={image} alt="" className="ui fluid image" />
                                    </div>
                                    <div className="column rp">
                                        <h1>{title}</h1>
                                        <h2>
                                            <a className="ui teal tag label">GHS {price}</a>
                                        </h2>
                                        <h3 className="ui brown block header">{category}</h3>
                                        <p>{description}</p>
                                        <div onClick={()=>handleAddToCart(singleProductView)} className="ui vertical animated button bg-primary text-white" tabIndex={'0'}>
                                            <div className="hidden content">
                                                <i className="shop icon"></i>
                                            </div>
                                            <div className="visible content">Add To Cart</div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            </div>
                    {/* <div className="ui grid left"> */}
                        <div onClick={()=>navigate('/')} class="ui pink animated button mb-5" tabindex="0">
                            <div class="visible content">CONTINUE SHOPPING</div>
                            <div class="hidden content">
                                <i class="left arrow icon"></i>
                            </div>
                        </div>
                    {/* </div> */}
                        </>
                    )}
                </div>
            </Container>
        </>
    );
};

export default ProductDetail;
