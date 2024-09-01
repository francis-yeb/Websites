

import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Modal from '@mui/material/Modal';
import CustomerOrderTab from '../../../components/CustomerOrderTabs';
import useOrderActions from '../../../redux/useHooks/useOrderActions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const AdminOrderListing = () => {
  
  const {ordersByStatus,ordercategory} = useOrderActions();
  console.log("order status data....",ordercategory);
  
  const orderCategories = ['Pending','Processing','Delivering','Delivered','Cancelled','Rejected'];

  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState([]);
  

    useEffect(() => {
      ordersByStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
      if(orderCategories){

        setCategories(orderCategories );
        // setCategories(orderCategories );
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    const handleRowSelected = (selectedRow) => {
      setRows(selectedRow);
    }

    // eslint-disable-next-line no-unused-vars
    const [filteredRows, setFilteredRows] = useState([]);

    const handleFilter = (filterValue) => {
      // Check if filterValue is a string
      if (typeof filterValue === 'string') {
        const filteredRows = rows.filter((row) =>
          row.title.toLowerCase().includes(filterValue.toLowerCase().trim())
        );
        setFilteredRows(filteredRows);
      } else {
        // Handle cases where filterValue is not a string (e.g., null or undefined)
        setFilteredRows([]);
      }
    };
    
    

    return (
        <div style={{padding:'0'}}>
            <Paper className={''}>
        {/* Add product model */}

        <div>
            <Modal
                // open={openAddModel}
                // onClose={handleAddModelClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <AddProductForm closeEvent={handleAddModelClose}/> */}
                </Box>
            </Modal>
        </div>
    {/* End of model */}

        {/*View product model */}

        <div>
            <Modal
                // open={openEditModel}
                // onClose={handleEditModelClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <EditProductForm closeEvent={handleEditModelClose} formid={formid}/> */}
                </Box>
            </Modal>
        </div>
    {/* End of model */}

        <Typography
        gutterBottom
        variant='h5'
        component={'div'}
        sx={{padding:"20px"}}>
            {/* Orders */}
        </Typography>
        <Divider/>
        <Box height={10}/>
        <Stack direction="row" spacing={2} className="my-2 mb-2">
        <Typography
        gutterBottom
        variant='h5'
        component={'div'}
        sx={{padding:"0 20px"}}>
            Orders
        </Typography>
            {/* <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => handleFilter(v)}
              getOptionLabel={(rows) => rows.title || ""}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Orders" 
                />
              )}
            /> */}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            {/* <Button 
            // onClick={handleAddModelOpen} 
            variant="contained" endIcon={<AddCircleIcon />}>
              Add Category
            </Button> */}
          </Stack>
          <Box height={10} />
          <CustomerOrderTab categories = {categories}  onRowSelect={handleRowSelected} filterData={handleFilter}/>
          <Box height={10} />
      
    </Paper>
        </div>
    );
}


export default AdminOrderListing;


