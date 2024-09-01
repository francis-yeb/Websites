import { Navbar, Nav, Container, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import { useState } from 'react';
import useAuthActions from '../redux/useHooks/useAuthActions';
import { FiUser } from "react-icons/fi";
import { LuUserCheck } from "react-icons/lu";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { FaRegEnvelope } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import Cart from './Cart';
import Logo from './logo';

export const MyNavBar = () => {
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);
    const { isLoggedIn, logout,user } = useAuthActions();
    // const {registerUser} = useRegisterActions()
    // const userP = user && user;

    const toggleSearch = () => {
        setShowSearch(!showSearch);
    };
    const login = () => {
        navigate('/login');
    }
    const register = () => {
        navigate('/register');
    }
    const orders = () => {
        navigate('/customer/orders');
    }

    return (
        <>
            <Navbar fixed="top" expand="md" className="bg-white shadow-sm">
                <Container>
                    <Logo/>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className="me-auto flex-shrink-0" to={'/'} as={NavLink}>Home</Nav.Link>
                            {isLoggedIn &&
                                <>
                                    <Nav.Link className="me-auto flex-shrink-0" to={'/products/1'} as={NavLink}>Product</Nav.Link>

                                </>
                            }
                            <Nav.Link className="me-auto flex-shrink-0" to='/store' as={NavLink}>Store</Nav.Link>
                            <Nav.Link className="me-auto flex-shrink-0" to='/about' as={NavLink}>About</Nav.Link>
                        </Nav>
                        <div className="d-flex align-items-center">
                            {showSearch ? (
                                <Form className="d-flex" style={{ background: 'none' }}>
                                    <FormControl
                                        type="search"
                                        placeholder="Search..."
                                        className="me-2 "
                                        aria-label="Search"
                                        style={{ borderColor: '#0281FA91' }}
                                    />
                                    <Button variant="outline-primary">Search</Button>
                                </Form>
                            ) : (
                                <IoSearch style={{ color: '#0281FA91', cursor: 'pointer' }} onClick={toggleSearch} />
                            )}
                        </div>
                        <Nav>
                            {!isLoggedIn ? (
                                <>
                                    <Dropdown style={{margin:'0 5px'}}>
                                    <Dropdown.Toggle variant="none" id="dropdown-basic">
                                       <FiUser size={25}/> Account
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item type='button' className='btn bg-primary' style={{textAlign:'center', color:'white'}} onClick={login}>SIGN IN</Dropdown.Item>
                                        <hr/>
                                        {/* <Nav.Link className='me-auto drop flex-shrink-0' to='/login' as={NavLink}><FiUser size={25}/> My Account</Nav.Link> */}
                                        <Dropdown.Item onClick={login}><FiUser size={25}/> My Account</Dropdown.Item>
                                        <Dropdown.Item onClick={login}><RiShoppingBag3Fill size={25}/> Orders</Dropdown.Item>
                                        <Dropdown.Item onClick={register}><FaUserPlus size={25}/>  Sign up</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                </>
                            ) : (
                                <Dropdown style={{margin:'0 5px'}}>
                                    <Dropdown.Toggle variant="none" id="dropdown-basic">
                                       <LuUserCheck size={25}/> {isLoggedIn &&user? user.name:'loadin...'}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to={`/users/${user.id}`}><FiUser size={25}/> My Account</Dropdown.Item>
                                        <Dropdown.Item onClick={orders}><RiShoppingBag3Fill size={25}/> Orders</Dropdown.Item>
                                        <Dropdown.Item ><FaRegEnvelope size={25}/> Inbox</Dropdown.Item>
                                        <hr/>
                                        <Dropdown.Item style={{textAlign:'center',color: '#0281FA'}} onClick={logout}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        </Nav>
                        <Cart />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}
