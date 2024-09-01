import { BsCart4 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
    const navigate = useNavigate();

    const startShopping = () => {
        navigate('/');
    }
    return (
        <div className="topPad">
            <div className="ui raised very padded text container segment mx-auto" >
            <div style={{width:'100px',display:'flex',background:'#B5B5B5',padding:'6px'}} class="ui medium mx-auto  rounded-circle " >
                 {<BsCart4 className="mx-auto " color="#0281FA" size={100}/>}
            </div>
            <h2 className="ui center mx-auto " style={{textAlign:'center',marginTop:'10px'}}>Your Cart is Empty!</h2>
            <p className="ui center mx-auto " style={{textAlign:'center',marginTop:'10px'}}>Browse our categories and discover orur best deals!</p>
            <div  style={{textAlign:'center',marginTop:'10px'}} onClick={startShopping}>
                <div style={{background:'#0281FA',color:'white'}} class="ui animated button" tabindex="0">
                    <div class="visible content">START SHOPPING</div>
                    <div class="hidden content">
                        <i class="left arrow icon"></i>
                    </div>
                    </div>
                </div>
            </div>
        
        </div>
    );
}


export default EmptyCart;