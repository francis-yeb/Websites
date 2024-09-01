/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import useAuthActions from "../redux/useHooks/useAuthActions";
import useCartActions from "../redux/useHooks/useCartActions";
import { useNavigate } from "react-router-dom";
import useOrderAction from "../redux/useHooks/useOrderActions";
import useCouponActions from "../redux/useHooks/useCouponActions";


const CheckOut = () => {
    const {makePayement} = useOrderAction();
    const {applyCoupon,appliedCouponResults,removeCoupon} = useCouponActions();
    const  [orderAmount, setOrderAmount] = useState(0.0);
    const delivery = 50.0;
    const navigate = useNavigate();
    const {user} = useAuthActions();
    const {cartItems} = useCartActions();
    console.log("applied resul",appliedCouponResults);

    // eslint-disable-next-line no-unused-vars
    const [items, setItems] = useState([]);
    // console.log('itemssss ',items)
    const [data, setData] = useState({
        userId: '',
        email: '',
        amount: '',
    });

    //After coupon has been applied
    // const [couponCode,setCouponCode] = useState('');
    const[appliedData, setAppliedData] = useState({
        code: '',
        amount: ''
    });

    // console.log('ittttt ',items)
    // console.log('customerrr ', orderAmount)
    useEffect(() => {
        setItems(cartItems)
        setData({
            userId: user && user.id,
            email: user && user.email,
            amount: appliedCouponResults.length < 1 
            ? orderAmount && orderAmount.toFixed(2)
            : appliedCouponResults[0]['subtotal'],
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[orderAmount,appliedCouponResults.length > 0 && appliedCouponResults[0]?.subtotal]);
    
    const totalAmount = () => {
        let amount = 0.0;
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems && cartItems[i].totalPrice) {
                amount += cartItems[i].totalPrice;
            }
        }
        return amount;
    };
    // console.log("Order amount",appliedCouponData);

    // useEffect(() => {
    //     setAppliedCouponData({
    //         code: couponCode.toLocaleUpperCase(),
    //         amount: totalAmount(),
    //     });
    // },[couponCode]);

    
    const handleCoupon =(e)=> {
        const coupon = e.target.value;
        setAppliedData({
            code: coupon,
            amount: totalAmount(),
        });
        console.log("Code...",coupon);
    }

    //Apply coupon
    const submitCoupon = (e) =>{
        e.preventDefault();
        // console.log("Coupon data",appliedCouponData);
        applyCoupon({...appliedData&&appliedData});
        
    }




    useEffect(() => {
        let amount = 0.0;
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems && cartItems[i].totalPrice) {
                amount += cartItems[i].totalPrice;
            }
        }
        setOrderAmount(amount + delivery);
    }, [cartItems]);


    const checkOut = (e) => {
        e.preventDefault();
        makePayement(data);
    }
   
    const renderItems = cartItems.map(item => {
        // eslint-disable-next-line no-unused-vars
        const { image, price, quantity, totalPrice, title } = item;
        return (
            <>
                {/* <div  className="col-md-8 col-12"> */}
                    
                    <div className="ui divider"></div>
                    <div className="d-flex">
                        <div>
                        <img style={{display:'block'}} class="ui middle aligned tiny image" src={image}/>
                        </div>
                        <div style={{marginLeft:'5px',}}>
                            <h2 style={{margin:'0'}} className="ui header mb-0">Header</h2><br/>
                            <h6 className="m-0">Price: 30</h6>
                            <h5 style={{opacity:0.7}}>In Stock</h5>
                            <h5 style={{fontWeight:'bold',color:"#0281FA"}}>Wizzy Express</h5>
                        </div>
                       <h1 className="ui header" style={{marginLeft:'35px'}}>{'2020'}</h1>
                       <div>
                       </div>
                    </div>
                    {/* <div className="d-flex justify-content-between">
                        <div onClick={''} className="remove mb-3">
                            <div class="ui vertical red animated button" tabindex="0">
                                <div class="hidden content">
                                <i class="trash alternate icon"></i>
                                </div>
                                <div class="visible content"> REMOVE </div>
                            </div>
                        </div>
                       
                    </div> */}
                   
                   
                {/* </div> */}
                
            </>
        );
    });

    return (
        <>
            <div className="container topPad" style={{paddingBottom:'20px'}}>
               <div className="row d-flex">
               <div  className="col-md-8 col-12 border">
                    <div className="address">
                        <h5 className="ui header pt-2">1. CUSTOMER ADDRESS</h5>
                        <div className="ui divider"></div>
                        <h6>{user.name}</h6>
                        <p>Accra | Greater Accra - Asylum Down | +233 553632881</p>
                    </div>
                    <div className="ui divider"></div>
                    <div className="address">
                        <h5 className="ui header pt-2">2. DELIVERY DETAILS</h5>
                        <div className="ui divider"></div>
                        <h6>Door Delivery</h6>
                        <p>Delivery between 09 May and 10 May</p>
                    </div>
                        <div className="ui divider"></div>
                        <h6 className="pt-2">Shipment 1/1</h6>
                    {renderItems}

                    <div onClick={()=>navigate('/cart')} class="ui black animated button mb-2" tabindex="0">
                        <div class="visible content">BACK</div>
                        <div class="hidden content">
                            <i class="left arrow icon"></i>
                        </div>
                    </div> 
               </div>


               <div  className="col-md-4 col-12 mt-2">
                    <div className="five wide column border">
                        <h4 className="ui header p-2">ORDER SUMMARY</h4>
                        <div className="ui inverted divider"></div>
                        {/* Before coupon was applied  */}
                        {appliedCouponResults.length < 1 && (
                            <div>
                                <h5 className="ui header mt-1 px-2">Item's total ({cartItems.length}) 
                                <span style={{ display:'flex',justifyContent:'end' }}>GHS {totalAmount().toFixed(2)} </span></h5>
                                <div className="ui inverted divider"></div>
                                <h5 className="ui header mt-1 px-2">Delivery fees 
                                <span style={{ display:'flex',justifyContent:'end' }}>GHS {delivery.toFixed(2)} </span></h5>
                                <div className="ui inverted divider"></div>
                                <form action="">
                                    <div className="d-flex justify-content-between px-2">
                                    <label htmlFor="amount">Total Amount: </label>
                                    GHS<input style={{border:'none',width:'80px',padding:'0',outline:'none'}} type="text" name="amount" value={orderAmount.toFixed(2)} />
                                    </div>

                                </form>

                                <div className="ui inverted divider"></div>
                                <form  onSubmit={submitCoupon}>
                                    <div className="d-flex justify-content-between px-3">
                                    <input className="border-danger rounded " type="text" name="code" 
                                    placeholder="Enter couponCode" style={{width:'80px'}}
                                    onChange={handleCoupon}/>
                                    <button className="btn bg-danger text-white" type="submit">Apply</button> <br />
                                    </div>
                                </form>
                            </div>
                         )}

                        {/* After coupon has been applied */}
                        {appliedCouponResults.length > 0 && (
                            <div>
                                <h5 className="ui header mt-1 px-2">Item's total ({cartItems.length}) 
                                <span style={{ display:'flex',justifyContent:'end' }}>GHS {totalAmount().toFixed(2)} </span></h5>
                                <div className="ui inverted divider"></div>
                                <h5 className="ui header mt-1 px-2">Delivery fees 
                                <span style={{ display:'flex',justifyContent:'end' }}>GHS {delivery.toFixed(2)} </span></h5>
                                <div className="ui inverted divider"></div>
                                <h5 className="ui header mt-1 px-2">Discount({appliedCouponResults[1]?.couponCode}) 
                                    <span className="btn" onClick={removeCoupon}>Remove</span>
                                    <span style={{ display:'flex',justifyContent:'end' }}>
                                        {appliedCouponResults[2]?.type === 'fixed'
                                            ? `GHS ${appliedCouponResults[3]?.value}`
                                            : `${appliedCouponResults[4]?.percentOff}%`
                                        } 
                                    </span>
                                </h5>

                                <div className="ui inverted divider"></div>
                                <form action="">
                                    <div className="d-flex justify-content-between px-2">
                                    <label htmlFor="amount">Total Amount: </label>
                                    GHS<input style={{border:'none',width:'80px',padding:'0',outline:'none'}} type="text" name="amount" value={appliedCouponResults[0]?.subtotal + delivery} />
                                    </div>

                                </form>

                                {/* <div className="ui inverted divider"></div> */}
                            </div>
                         )}
                        
                        {/* End */}
                        <div className="ui inverted divider"></div>
                        <div style={{ textAlign: 'center', marginTop: '10px' }} onClick={checkOut}>
                            <div style={{ background: '#0281FA', color: 'white', width: '95%' }} 
                            className="ui animated  button" tabIndex="0">
                                <div className="visible content">CONFIRM ORDER</div>
                                <div className="hidden content">
                                GHS {appliedCouponResults.length < 1 ? orderAmount.toFixed(2):appliedCouponResults[0]?.subtotal}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

               </div>
            </div>
        </>
    );
}

export default CheckOut;