import Box  from "@mui/material/Box";
import SideNav from "../components/SideNav";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import StorefrontIcon from '@material-ui/icons/Storefront';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccordionDash from "../components/AccordionDash";
import BarChart from "../charts/BarChart";

const Dashboard = () => {
    
    return (
        <>
        {/* <MyAppBar/> */}
            <div className="bgColor" style={{paddingTop: '80px'}}>
            <Box height={0}/>
                <Box sx={{display:"flex",background:'#F1F1F2',height:'100%'}} margin={0}>
                    <SideNav />
                    <Box height={30} margin={0}/>
                    <Box component="main" sx={{ flexGrow: 1, p: 3,ml:0 }} >
                        <Grid container spacing={2} >
                            <Grid item xs={8}>
                                <Stack spacing={2} direction={'row'}>
                                    <Card sx={{ minWidth: 49 +'%',height: 150 }} className="gradient">
                                    
                                        <CardContent>
                                            <div className="iconStyle">

                                            <CreditCardIcon/>
                                            </div>
                                            <Typography gutterBottom variant="h5" component="div" className="iconStyle">
                                                GHS 500.00
                                            </Typography>
                                            <Typography gutterBottom variant="body2" component="div" sx={{color:'#ccd1d1'}}>
                                                Total Earning 
                                            </Typography>
                                            
                                        </CardContent>
                                    
                                    </Card>
                                    <Card sx={{ minWidth: 49 +'%',height: 150 }} className="gradientLight">
                                        <CardContent>
                                            <div className="iconStyle">

                                            <ShoppingBasketIcon/>
                                            </div>
                                            <Typography gutterBottom variant="h5" component="div" className="iconStyle">
                                                GHS 900.00
                                            </Typography>
                                            <Typography gutterBottom variant="body2" component="div" sx={{color:'#ccd1d1'}}>
                                                Total Orders 
                                            </Typography>
                                            
                                        </CardContent>
                                    </Card>
                                </Stack>
                            </Grid>

                            <Grid item xs={4}>
                                <Stack spacing={2}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardContent className="gradientLight">
                                            <Stack spacing={2} direction={'row'}>
                                                <div className="iconStyle">
                                                    <StorefrontIcon/>

                                                </div>
                                                <div className="paddingall">
                                                    <span className="priceTitle text-white">GHS203K</span>
                                                    <br />
                                                    <span className="priceSubTitle text-white">Total Income</span>
                                                </div>
                                            </Stack>
                                        </CardContent>
                                    
                                    </Card>
                                    <Card sx={{ maxWidth: 345 }}>
                                    <CardContent>
                                            <Stack spacing={2} direction={'row'}>
                                                <div className="iconStyleBlack">
                                                    <StorefrontIcon/>

                                                </div>
                                                <div className="paddingall">
                                                    <span className="priceTitle">GHS203K</span>
                                                    <br />
                                                    <span className="priceSubTitle">Total Income</span>
                                                </div>
                                            </Stack>
                                        </CardContent>
                                    
                                    </Card>
                                </Stack>
                            </Grid>
                            <Box height={20}/>
                            {/* <Grid container spacing={3}> */}
                                <Grid item xs={8}>
                                    <Card sx={{ height: 70+'vh' }}>
                                                <CardContent>
                                                <BarChart/>
                                                </CardContent>
                                            
                                    </Card>
                                </Grid>
                                <Grid item xs={4}>
                                    <Card sx={{ height: 70+'vh' }}>
                                                <CardContent>
                                                    <div className="paddingall">
                                                        <span className="priceTitle">Popular Products</span>
                                                        
                                                        <AccordionDash/>
                                                    </div>
                                                </CardContent>
                                            
                                    </Card>
                                </Grid>
                            {/* </Grid> */}
                        </Grid>
                        
                    </Box>
                </Box>
            </div>
        </>
    );
}


export default Dashboard;