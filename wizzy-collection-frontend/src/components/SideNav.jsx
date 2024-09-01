import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MdDashboard } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineCategory } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { CiDiscount1 } from "react-icons/ci";
import { IoSettingsSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate,  useLocation } from 'react-router-dom';
import { useAppStore } from '../store/AppStore';
import useAuthActions from '../redux/useHooks/useAuthActions';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideNav() {
  const location = useLocation();
  const {logout} = useAuthActions();
 
  // Function to determine if a given route is active
const isActive = (route) => {
  return location.pathname === route;
};

// Apply custom styles based on active status
const activeLinkStyles = {
  color: '#E91E63', // Change this to your desired color
};


  const navigate = useNavigate();
  
  const open = useAppStore(state => state.dopen);


  
  return (
   <>
      <Box sx={{ display: 'flex', }} margin={0}>
      <CssBaseline />
      <Drawer style={{margin:'0'}} variant="permanent"  open={open} >
        
        <Divider style={{marginTop:'72px'}} />
        <List >
            {/* Dashboard Link */}
            <ListItem className='listItem'  disablePadding sx={{ display: 'block' }}>
                <ListItemButton component={Link} to="/dashboard"
                sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                }}
                >
                    <ListItemIcon
                        sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        ...(isActive('/dashboard')&&activeLinkStyles),
                        }}
                    >
                        { <MdDashboard size={25} />}
                    </ListItemIcon>
                    <ListItemText primary='Dashboard' sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>

            {/* Product link */}
            <ListItem className='listItem' disablePadding sx={{ display: 'block' }} onClick={()=>navigate('/products')}>
                <ListItemButton
                sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                }}
                >
                    <ListItemIcon
                        sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                ...(isActive('/products')&&activeLinkStyles)

                        }}
                    >
                        { <HiOutlineShoppingBag size={25} />}
                    </ListItemIcon>
                    <ListItemText primary='Products' sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>

            {/* Category link */}
            <ListItem className='listItem'  disablePadding sx={{ display: 'block' }} onClick={()=>navigate('/category')}>
                <ListItemButton
                sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                }}
                >
                    <ListItemIcon
                        sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                ...(isActive('/category')&&activeLinkStyles)

                        }}
                    >
                        { <MdOutlineCategory size={25} />}
                    </ListItemIcon>
                    <ListItemText primary='Category' sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>

             {/* Orders link */}
             <ListItem className='listItem'  disablePadding sx={{ display: 'block' }}>
                <ListItemButton component={Link} to={'/admin/customer/orders'}
                sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                }}
                >
                    <ListItemIcon
                        sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                ...(isActive('/admin/customer/orders')&&activeLinkStyles)

                        }}
                    >
                        { <FaShippingFast size={25} />}
                    </ListItemIcon>
                    <ListItemText primary='Orders' sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>

            {/* Customers link */}
            <ListItem className='listItem'  disablePadding sx={{ display: 'block' }}>
                <ListItemButton component={Link} to={'/customers'}
                sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                }}
                >
                    <ListItemIcon
                        sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                ...(isActive('/customers')&&activeLinkStyles)

                        }}
                    >
                        { <FaUsers size={25} />}
                    </ListItemIcon>
                    <ListItemText primary='Customers' sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>

           

            {/* Coupons link */}
            <ListItem className='listItem'  disablePadding sx={{ display: 'block' }}>
                <ListItemButton component={Link} to={'/coupons'}
                sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                }}
                >
                    <ListItemIcon
                        sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                ...(isActive('/coupons')&&activeLinkStyles)

                        }}
                    >
                        { <CiDiscount1 size={25} />}
                    </ListItemIcon>
                    <ListItemText primary='Coupons' sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>

            {/* Settings link */}
            <ListItem className='listItem' disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                }}
                >
                    <ListItemIcon
                        sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                        }}
                    >
                        { <IoSettingsSharp size={25} />}
                    </ListItemIcon>
                    <ListItemText primary='Settings' sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>


        </List>
        <Divider />
        <List>
        <ListItem disablePadding sx={{ display: 'block' }} onClick={logout}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  { <CiLogout size={40} color='#E91E63'/> }
                </ListItemIcon>
                <ListItemText primary='Logout' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
    
    </Box>
   </>
  );
}