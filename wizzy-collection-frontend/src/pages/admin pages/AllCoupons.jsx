import Box  from "@mui/material/Box";
import SideNav from "../../components/SideNav";
import CouponListing from "./adminComponents/CouponListing";


const AllCoupons = () => {
    
    return (
        <div className="topPad">
            <Box sx={{display:"flex"}}>
                <SideNav/>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {/* <h1>AllCoupons</h1> */}
                <CouponListing/>
                </Box>
            </Box>
        </div >
    );
}


export default AllCoupons;