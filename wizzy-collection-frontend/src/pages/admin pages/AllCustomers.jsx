import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
// import useProductActions from '../../../redux/useHooks/useProductActions';
import useProductActions from '../../redux/useHooks/useProductActions';
import { useNavigate, useParams } from "react-router-dom";
import Modal from '@mui/material/Modal';
// import AddCustomerForm from './AddCustomerForm';
import AddCustomerForm from './adminComponents/AddCustomerForm';
// import EditCustomerForm from './EditCustomerForm';
import EditCustomerForm from './adminComponents/EditCustomerForm';

// import Skeleton from '@mui/material/Skeleton';
// import RectangleSkeleton from '../../skeleton/RectangleSkeleton';
import RectangleSkeleton from '../skeleton/RectangleSkeleton';
import useCustomerActions from '../../redux/useHooks/useCustomerActions';
import { FiUser } from 'react-icons/fi';




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

export default function AllCustomers() {
    //Model Methods 
    const [openAddModel, setOpenAddModel] = useState(false);
    const handleAddModelOpen = () => setOpenAddModel(true);
    const handleAddModelClose = () => setOpenAddModel(false);
    //Edit model method
    const [formid, setFormid] = useState('');
    const [openEditModel, setOpenEditModel] = useState(false);
    const handleEditModelClose = () => setOpenEditModel(false);
    const handleEditModelOpen = () =>setOpenEditModel(true);



    const navigate = useNavigate();

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);
    // const {products,deleteCustomer} = useProductActions();
    const {allCustomers,customers,deleteCustomer} = useCustomerActions();
    const [loading,setLoading] = useState(true);

    // console.log(allCustomers);

    const getCustomers = async() => {
      const fetchedProduct = await allCustomers;
      // setLoading(true);
      setRows(fetchedProduct);
      setLoading(false);
    }

  const editData = (product) => {
    setFormid(product)
    handleEditModelOpen()
  }

  useEffect(() => {
    customers();
  },[]);

  useEffect(()=>{
    setLoading(true);
    getCustomers()
    
  },[customers]);

  const deleteApi = async(id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then( async (result) => {
      if (result.value) {
        await deleteCustomer(id);
    }
    });
    getCustomers()
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
        setRows([]);
      getCustomers();
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>    
    {/* Add product model */}

        <div>
            <Modal
                open={openAddModel}
                onClose={handleAddModelClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddCustomerForm closeEvent={handleAddModelClose}/>
                </Box>
            </Modal>
        </div>
    {/* End of model */}

        {/*View product model */}

        <div>
            <Modal
                open={openEditModel}
                onClose={handleEditModelClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <AddCustomerForm closeEvent={handleAddModelClose}/> */}
                    <EditCustomerForm closeEvent={handleEditModelClose} formid={formid}/>
                </Box>
            </Modal>
        </div>
    {/* End of model */}
        {loading ===false ? (

          <Paper className={classes.root}>
              <Typography
                gutterBottom
                variant='h5'
                component={'div'}
                sx={{padding:"20px"}}>
                    All Customers
              </Typography>
              <Divider/>
              <Box height={10}/>
              <Stack direction="row" spacing={2} className="my-2 mb-2">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={rows}
                    sx={{ width: 300 }}
                    onChange={(e, v) => filterData(v)}
                    getOptionLabel={(rows) => rows.name || ""}
                    renderInput={(params) => (
                      <TextField {...params} size="small" label="Search Products" />
                    )}
                  />
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                  ></Typography>
                  <Button onClick={handleAddModelOpen} variant="contained" endIcon={<AddCircleIcon />}>
                    Add Customer
                  </Button>
              </Stack>
              <Box height={10} />
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                        <TableCell
                          align="left"
                          style={{ minWidth: "100px" }}
                        >
                            Photo
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: "100px" }}
                        >
                            Name
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: "100px" }}
                        >
                            Phone
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: "100px" }}
                        >
                            Email
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: "100px" }}
                        >
                            Address
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: "100px" }}
                        >
                            City
                        </TableCell>
                        
                        <TableCell
                          align="left"
                          style={{ minWidth: "100px" }}
                        >
                            Actions
                        </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.length < 1 && (
                    <div style={{margin: '8px 20px', textAlign: 'center', width:'100%'}} className=''>No data...</div>
                    )}
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1}>
                          
                              <TableCell  align={'left'} >
                              <FiUser size={25}/>
                              {/* <img  src="/upload.png" width={50} height={30} /> */}
                              </TableCell>
                              <TableCell  align={'left'}>
                                {row.name}
                              </TableCell>
                              <TableCell  align={'left'}>
                                {row.phoneNumber}
                              </TableCell>
                              <TableCell  align={'left'}>
                                {row.email}
                              </TableCell>
                              <TableCell  align={'left'}>
                                {row.address}
                              </TableCell>
                              <TableCell  align={'left'}>
                                {row.city}
                              </TableCell>
                              

                              {/* Action buttons */}
                              <TableCell key={row.id} align={'left'}>
                              <Stack spacing={2} direction="row">
                                    <EditIcon
                                      style={{
                                        fontSize: "20px",
                                        color: "blue",
                                        cursor: "pointer",
                                      }}
                                      className="cursor-pointer"
                                      onClick={() => editData(row)}
                                      // onClick={() => handleEditModelOpen(row)}
                                    />
                                    <DeleteIcon
                                      style={{
                                        fontSize: "20px",
                                        color: "darkred",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        deleteApi(row.id);
                                      }}
                                    />
                                  </Stack>
                              </TableCell>
                          
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5,10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
          </Paper>
        ):
        (
          <RectangleSkeleton/>
         )}

        

    </>
  );
}
