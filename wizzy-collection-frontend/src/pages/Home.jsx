// import CartItems from "../components/CartItems";
import MyCarousel from "../components/MyCarousel";
// import Product from "../components/Product";
import ProductListing from "../components/ProductListing";
// import useCartActions from "../redux/useHooks/useCartActions";
// import { Container } from "react-bootstrap";
// import { GiRunningShoe } from "react-icons/gi";
// import { GiBallerinaShoes } from "react-icons/gi";
// import { GiAmpleDress } from "react-icons/gi";
// import { PiShirtFoldedDuotone } from "react-icons/pi";
// import { RxActivityLog, RxAlignBottom } from "react-icons/rx";

const Home = () => {
    
    return (
        <>
           {/* <Container style={{width:'100%'}}> */}
            <div className='main-section' >
                <div className="main-container bg-white">
                <div className="container">
                    <div className="row ">
                        <div className="col-12 col-lg-6 mb-4">
                        {/* First column content */}
                        <div className="hero shadow">
                            <MyCarousel />
                        </div>
                        </div>
                        <div className="col-12 col-lg-6 mb-4">
                        {/* Second column content */}
                        <div className="hero shadow">
                        <div class="container ">
                            <div class="row align-items-center">
                                <div class="col-12 col-lg-6 text-center text-lg-start mb-4">
                                <h1 class="display-4 fw-bold">
                                    LET'S <br />
                                    <span class="text-highlight">EXPLORE</span> <br />
                                    UNIQUE <br /> CLOTHES.
                                </h1>
                                <p class="lead">Live for influential and innovative fashion!</p>
                                <a href="#" class="btn btn-dark btn-lg">SHOP NOW</a>
                                </div>
                                
                                <div class="col-12 col-lg-6 text-center">
                                <img src="/images/expore.jpeg" class="img-fluid rounded" style={{ height: '300px', objectFit: 'cover' }} alt="Explore Unique Clothes" />
                                </div>
                            </div>
                            </div>

                        </div>
                        </div>
                    </div>
                    </div>

                    <div className="img-sec">
                        <div className="img-sec-trans">
                            <h1 className="trans-text">Quality is our measure</h1>
                            <button type="button" class="btn sh btn-danger">VIEW SHOP</button>
                        </div>
                    </div>

                    <div className="product-con">
                        
                        <ProductListing />
                    </div>

                    {/* Reviews Section */}
                    {/* Reviews Section with Carousel */}
                    <section className="reviews-section py-5 bg-light">
                        <div className="container">
                            <h2 className="text-center mb-4">What Our Customers Are Saying</h2>

                            <div id="reviewsCarousel" className="carousel slide">
                                <div className="carousel-inner">
                                    {/* Review 1 */}
                                    <div className="carousel-item active">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="review-card mx-3">
                                                <img src="/images/user2.jpeg" className="img-fluid rounded-circle mb-3" alt="User 1" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                                <h5 className="mb-1">John Doe</h5>
                                                <p className="mb-2">"Amazing shoes! They fit perfectly and look stylish. Highly recommend!"</p>
                                                <span className="badge bg-secondary">5 Stars</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Review 2 */}
                                    <div className="carousel-item">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="review-card mx-3">
                                                <img src="/images/user1.jpeg" className="img-fluid rounded-circle mb-3" alt="User 2" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                                <h5 className="mb-1">Jane Smith</h5>
                                                <p className="mb-2">"The clothes are of high quality and the service was excellent. Will shop here again."</p>
                                                <span className="badge bg-secondary">4 Stars</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Review 3 */}
                                    <div className="carousel-item">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="review-card mx-3">
                                                <img src="/images/user3.jpeg" className="img-fluid rounded-circle mb-3" alt="User 3" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                                <h5 className="mb-1">Alice Johnson</h5>
                                                <p className="mb-2">"Love the variety and the quality of the products. My go-to place for fashion."</p>
                                                <span className="badge bg-secondary">5 Stars</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <a className="carousel-control-prev" href="#reviewsCarousel" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#reviewsCarousel" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </section>


                    <footer class="bg-dark text-white text-center text-lg-start mt-auto py-4">
                        <div class="container">
                            <div class="row">
                            <div class="col-lg-4 col-md-12 mb-4 mb-md-0">
                                <h5 class="text-uppercase">About Wizzy Collections</h5>
                                <p>
                                Your go-to destination for the latest trends in shoes and clothes for both men and women. Discover our exclusive collections and enjoy top-notch customer service.
                                </p>
                            </div>

                            <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                                <h5 class="text-uppercase">Quick Links</h5>
                                <ul class="list-unstyled">
                                <li><a href="/" class="text-white">Home</a></li>
                                <li><a href="#" class="text-white">Men's Collection</a></li>
                                <li><a href="#" class="text-white">Women's Collection</a></li>
                                <li><a href="#" class="text-white">Sale</a></li>
                                <li><a href="#" class="text-white">Contact Us</a></li>
                                </ul>
                            </div>

                            <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                                <h5 class="text-uppercase">Contact Information</h5>
                                <ul class="list-unstyled">
                                <li><i class="bi bi-geo-alt"></i> 123 Madina St, Accra City, GA-56789</li>
                                <li><i class="bi bi-envelope"></i> <a href="mailto:support@wizzycollections.com" class="text-white">support@wizzycollections.com</a></li>
                                <li><i class="bi bi-phone"></i> <a href="tel:+1234567890" class="text-white">+233 (54) 449-6526</a></li>
                                </ul>
                            </div>
                            </div>
                        </div>

                        <div class="text-center py-3">
                            © 2024 Wizzy Collections. All rights reserved.
                        </div>
                    </footer>


                </div>
            </div>
           {/* </Container> */}
        </>
    );
};

export default Home;
