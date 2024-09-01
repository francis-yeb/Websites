import "./App.css";
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { Container } from "react-bootstrap";
import { MyNavBar } from "./components/MyNavBar";
import { MyRoutes } from "./components/MyRoutes";
import Notification from "./components/Notification";
import AdminDashboardRedirect from "./components/AdminDashboardRedirect";
import MyAppBar from "./components/MyAppBar";
import useAuthActions from "./redux/useHooks/useAuthActions";




function App() {
  const location = useLocation();
  const renderNavbar = location.pathname === '/404';
  const renderAppBar = location.pathname === '/404';
  const {user} = useAuthActions();
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const navbarHeight = 60; // Example height of the fixed navbar

  

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const contentHeight = viewportHeight - navbarHeight;

  const containerStyle = {
    marginTop: navbarHeight,
    height: viewportHeight - navbarHeight,
    // overflowY: "auto", // Add scrollbar if content exceeds container height
  };

  const shouldRenderNavBar = renderNavbar && user && user.role !== 'admin';
const shouldRenderNotFoundNavBar = renderNavbar && !shouldRenderNavBar;

  return (
    <div  className="">
      <Notification />
      {user?user.role !=='admin' &&<MyNavBar />:<MyNavBar/>}
      {/* {shouldRenderNavBar && <MyNavBar />} */}
    {/* {shouldRenderNotFoundNavBar && <MyNavBar />} */}
      {user&&user.role==='admin' &&<MyAppBar />}
      
      {/* <Container className=" " > */}
        <MyRoutes />
        {/* <MyAppBar/>
        <SideNav/> */}
        
        {/* <AdminDashboardRedirect/> */}
        
      {/* </Container> */}
    </div>
  );
}

export default App;

