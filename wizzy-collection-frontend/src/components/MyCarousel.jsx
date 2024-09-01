import { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import useCarouselActions from "../redux/useHooks/useCarouselActions";
import useProductActions from "../redux/useHooks/useProductActions";

const MyCarousel = () => {
    const {slideIndex, nextSlide,prevSlide} = useCarouselActions();
    const {products, allProducts} = useProductActions();
    const [limitedProducts, setLimitedProducts] = useState([]);
    const [index, setIndex] = useState(0);
    

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
    
    const getProduct = async() => {
        const fetchedProducts = await products;
        // const shuffledProducts = fetchedProducts && fetchedProducts.sort(() => 0.5 - Math.random());
        setLimitedProducts(fetchedProducts.slice(1,6));
    }

    useEffect(() => {
        getProduct()
    },[products]);

    return (

        <>
            {/* <div className="myCaro relative pb-4 mb-0"> */}
                <div>
                    <Carousel activeIndex={index} onSelect={handleSelect} className="" >
                    {limitedProducts.map((item, index) => {
                        return (
                                <Carousel.Item key={index} style={{height:'300px'}}>
                                    {/* <ExampleCarouselImage text="First slide" /> */}
                                    <img src={item.image} style={{height:"310px"}} alt={item.title} className="carousel-img" />
                                    <Carousel.Caption>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                
                        );
                    })}
                    </Carousel>
                </div>
                
            {/* </div> */}

        </>
    );
}


export default MyCarousel;