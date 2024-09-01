import Box  from "@mui/material/Box";
import SideNav from "../../components/SideNav";
import AdminOrderListing from "./adminComponents/AdminOrderListing";





const AllOrders = () => {
    
    return (
        <>
            <div className="bgColor">
                <Box height={0}/>
                <Box sx={{display:"flex",background:'#F1F1F2',height:'100%'}}>
                        <SideNav/>
                    <Box component="main" sx={{ flexGrow: 1, p: 3, ml:0 }}>
                        {/* <h1>All Products</h1> */}
                        {/* <AdminCategoryListing/> */}
                        <AdminOrderListing/>
                    </Box>
                </Box>
            </div>
        </>
    );
}


export default AllOrders;