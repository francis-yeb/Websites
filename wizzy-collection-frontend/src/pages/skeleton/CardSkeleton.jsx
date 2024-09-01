import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import useProductActions from "../../redux/useHooks/useProductActions";
import { Container } from 'react-bootstrap';



function Media(props) {
  const { loading = false } = props;
  const { products, allProducts } = useProductActions(); // Use your hook to get product data

  // Use the real product data, assuming 'products' is an array of items
  // Change from 3 to 4 to create 4 skeletons
  const productData = loading ? Array.from(new Array(4)) : products;

  return (
    <Grid container wrap="nowrap">
      {productData.map((item, index) => (
        <Box key={index} sx={{ width: 200, marginRight: 0.5, my: 5 }}>
          {loading || !item ? (
            // Show skeletons if loading or if there is no item
            <div className='mt-3'>
              <Skeleton variant="rectangular" width={210} height={118} />
              <Skeleton />
              <Skeleton width="60%" className='mb-2' />
              <Skeleton variant="rectangular" width={210} height={118} />
            </div>
          ) : (
            // Show the actual product data
            <>
              <img
                style={{ width: 210, height: 118 }}
                alt={item.title}
                src={item.src}
              />
              <Box sx={{ pr: 2 }}>
                <Typography gutterBottom variant="body2">
                  {item.title}
                </Typography>
                <Typography display="block" variant="caption" color="text.secondary">
                  {item.channel}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {`${item.views} • ${item.createdAt}`}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      ))}
    </Grid>
  );
}


export default function CardSkeleton() {
  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Pass the 'loading' prop to control skeleton display */}
      <Media loading />
      {/* <Media /> */}
    </Box>
  );
}
