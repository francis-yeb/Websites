  import React, { useState, useEffect } from 'react';
  import { makeStyles } from '@material-ui/core/styles';
  import Paper from '@material-ui/core/Paper';
  import Divider from '@mui/material/Divider';
  import Typography from '@mui/material/Typography';
  import AddCircleIcon from "@mui/icons-material/AddCircle";
  import Button from "@mui/material/Button";
  import Box from "@mui/material/Box";
  import Stack from "@mui/material/Stack";
  import TextField from "@mui/material/TextField";
  import Autocomplete from "@mui/material/Autocomplete";
  import useProductActions from '../../../redux/useHooks/useProductActions';
  import { useNavigate, useParams } from "react-router-dom";
  import Modal from '@mui/material/Modal';
  import MyTabs from './MyTabs';
  import ClothingCategory from '../tabContents/ClothingCategory';
  import ShoeCategory from '../tabContents/ShoeCategory';

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

  const useStyles = makeStyles({
  root: {
    // width: '100%',
    flexGrow: 1,
    // padding: theme.spacing(2),
  },
  container: {
    maxHeight: 440,
  },
  });

  const pages = {
    // "clothings": <ClothingCategory/>,
    // "shoes": <ShoeCategory/>
  }


  const AdminCategoryListing = () => {
    
    const {productCategories,getProductCategory} = useProductActions();
    
    
    const navigate = useNavigate();
    
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);
    const [categories, setCategories] = useState([]);
    // console.log("product category..",categories && categories)

      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

      const getProducts = () => {
        // setSearchValue(products);
      }

      useEffect(() => {
        getProductCategory();
        // setCategories(productCategories.categories || []);
      },[]);

      useEffect(() => {
        if(productCategories){

          setCategories(productCategories.categories );
        }
      },[productCategories]);


      const handleRowSelected = (selectedRow) => {
        setRows(selectedRow);
      }

      const [filteredRows, setFilteredRows] = useState([]);

      const handleFilter = (filterValue) => {
        // Check if filterValue is a string
        if (typeof filterValue === 'string') {
          const filteredRows = rows.filter((row) =>
            row.title.toLowerCase().includes(filterValue.toLowerCase())
          );
          setFilteredRows(filteredRows);
        } else {
          // Handle cases where filterValue is not a string (e.g., null or undefined)
          setFilteredRows([]);
        }
      };
      

      return (
          <>
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
              Product Categories
          </Typography>
          <Divider/>
          <Box height={10}/>
          <Stack direction="row" spacing={2} className="my-2 mb-2">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={rows}
                sx={{ width: 300 }}
                onChange={(e, v) => handleFilter(v)}
                getOptionLabel={(rows) => rows.title || ""}
                renderInput={(params) => (
                  <TextField {...params} size="small" label="Search Products" 
                  // onChange={e => handleFilter(e.target.value)}
                  />
                )}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              ></Typography>
              <Button 
              // onClick={handleAddModelOpen} 
              variant="contained" endIcon={<AddCircleIcon />}>
                Add Category
              </Button>
            </Stack>
            <Box height={10} />
            <MyTabs categories = {categories} pages = {pages} onRowSelect={handleRowSelected} filterData={handleFilter}/>
            <Box height={10} />
        
      </Paper>
          </>
      );
  }


  export default AdminCategoryListing;


