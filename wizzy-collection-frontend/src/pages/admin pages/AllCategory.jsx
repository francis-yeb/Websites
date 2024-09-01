import Box  from "@mui/material/Box";
import SideNav from "../../components/SideNav";
import AdminCategoryListing from "./adminComponents/AdminCategoryListing";





const AllCategory = () => {
    
    return (
        <>
            <div className="bgColor">
                <Box height={0}/>
                <Box sx={{display:"flex",background:'#F1F1F2',height:'100%'}}>
                        <SideNav/>
                    <Box component="main" sx={{ flexGrow: 1, p: 3, ml:0 }}>
                        {/* <h1>All Products</h1> */}
                        <AdminCategoryListing/>
                    </Box>
                </Box>
            </div>
        </>
    );
}


export default AllCategory;