import Box  from "@mui/material/Box";
import SideNav from "../../components/SideNav";
import AllCustomers from "./AllCustomers";


const Customers = () => {
    
    return (
        <div className="topPad">
            <Box sx={{display:"flex"}}>
                <SideNav/>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {/* <h1>Customers</h1> */}
                <AllCustomers/>
                </Box>
            </Box>
        </div >
    );
}


export default Customers;