import { Button, Card} from "react-bootstrap";
import useCartActions from "../redux/useHooks/useCartActions";
import data from '../data/data.json';
import React from "react";
import useNotificationActions from "../redux/useHooks/useNotificationActions";


const Product = () => {
    const {showNotification} = useNotificationActions();
    const {addToCart} = useCartActions()
    
    const handleAddToCarts = (item)=>{
        addToCart(item);
        showNotification({type:'success',message:'item has been added to cart',open:true})
    } 

   
    return (
        <div>
            {data.data.map(item=> (
                <React.Fragment key={item.id}>
                    <Card className="card mb-3" style={{width: '18rem',height:'18rem'}}>
            
                        <Card.Img variant="top" style={{height:'10rem',objectFit:'contain'}} src={item.imgUrl}/>
                        <Card.Body style={{textAlign:'center',height:'200px'}}>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>
                                {item.price}
                            </Card.Text>
                            <Button onClick={()=>handleAddToCarts(item)} variant="primary">Add To Cart</Button>
                        </Card.Body>
                    </Card>
                </React.Fragment>
            ))}
        </div>
    );
}

export default Product;