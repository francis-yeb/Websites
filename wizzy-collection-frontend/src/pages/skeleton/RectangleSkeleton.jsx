import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from "@mui/material/Box";
import Skeleton from '@mui/material/Skeleton';


const RectangleSkeleton = () => {

    return (
        <>
        <Paper sx={{width:'98%',overflow:'hidden',padding:'12px'}}>
            <Box height={20} />
            <Skeleton variant="rectangular" width={'100%'} height={30} />
            <Box height={40} />
            <Skeleton variant="rectangular" width={'100%'} height={60} />
            <Box height={20} />
            <Skeleton variant="rectangular" width={'100%'} height={60} />
            <Box height={20} />
            <Skeleton variant="rectangular" width={'100%'} height={60} />
            <Box height={20} />
            <Skeleton variant="rectangular" width={'100%'} height={60} />
            <Box height={20} />
            <Skeleton variant="rectangular" width={'100%'} height={60} />
            <Box height={20} />
          </Paper>
        </>
    );
}


export default RectangleSkeleton;