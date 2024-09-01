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
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useProductActions from '../../../redux/useHooks/useProductActions';
import { useNavigate, useParams } from "react-router-dom";
import RectangleSkeleton from '../../skeleton/RectangleSkeleton';
import useOrderAction from '../../../redux/useHooks/useOrderActions';
import Swal from "sweetalert2";
import Modal from '@mui/material/Modal';
import UpdateOrderStatus from '../adminComponents/UpadateOrderStatusForm';


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




const OrderStatus = ({category,onRowSelect,FilterData}) => {
  //Model Methods 
  const [openAddModel, setOpenAddModel] = useState(false);
  const handleAddModelOpen = () => setOpenAddModel(true);
  const handleAddModelClose = () => setOpenAddModel(false);
  //Edit model method
  const [formid, setFormid] = useState('');
  const [openEditModel, setOpenEditModel] = useState(false);
  const handleEditModelClose = () => setOpenEditModel(false);
  const handleEditModelOpen = () =>setOpenEditModel(true);
  
  // const {ordersByStatus,ordercategory,removeOrderCategory} = useProductActions();
  const {ordercategory,ordersByStatus,removeOrderCategory,getUserOrders,userOrders,deleteOrder} = useOrderAction();
  // console.log("alllll pro ",ordercategory)
  
  // const navigate = useNavigate();
  
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
//   console.log("product category..",categories && categories)
console.log("Category orders",ordercategory);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const getOrders = async()=>{
      const fetchedOders = await getUserOrders();
      // setRows(fetchedOders);
      setLoading(false);
    }

    
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

  
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      if (category) {
        await ordersByStatus(category.toLowerCase());
        setLoading(false);
      }
      getOrders()
    };
    fetchOrders();

    return () => removeOrderCategory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    if (ordercategory && ordercategory.length > 0) {
      setRows(ordercategory);
      onRowSelect(ordercategory);
      setLoading(false);
    } else {
      setRows([]);
      onRowSelect([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordercategory]);

    // eslint-disable-next-line no-unused-vars
    const handleFilterData = (v) => {
      if (v) {
        setRows([v]);
      } else {
          setRows([]);
        ordersByStatus(category.toLowerCase());
      }
      FilterData(v);
    };

    
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    }

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
          await deleteOrder(id);
      }
      });
      getUserOrders()
    };
    const editstatus = (order) => {
      setFormid(order)
      handleEditModelOpen()
    }
    
    return (
        <>
            {/*View product model */}

            <div>
            <Modal
                open={openEditModel}
                onClose={handleEditModelClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <AddProductForm closeEvent={handleAddModelClose}/> */}
                    <UpdateOrderStatus closeEvent={handleEditModelClose} formid={formid}/>
                </Box>
            </Modal>
        </div>
    {/* End of model */}

    {loading ? (
        <RectangleSkeleton />
      ) : rows.length > 0 ? (
        <Paper className={classes.root}>
          <Typography gutterBottom variant='h5' component='div' sx={{ padding: "20px" }}>
            {category.toUpperCase()}
          </Typography>

          <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                        <TableCell
                          align="left"
                          style={{ minWidth: "100px" }}
                        >
                            Customer
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: "100px" }}
                        >
                            Amount
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
                            Phone
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: "100px" }}
                        >
                            Payment Method
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: "100px" }}
                        >
                            Status
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: "100px" }}
                        >
                            date
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
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id} >
                          
                              {/* <TableCell  align={'left'} >
                              <img
                        onClick={() => navigate(`/products/${row.id}`)}
                        src={row.image}
                        width={50}
                        height={40}
                        alt=""
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.src = 'placeholder_image_url'; // Replace with placeholder image URL
                        }}
                      />
                              </TableCell> */}
                              <TableCell  align={'left'}>
                                {row.userId}
                              </TableCell>
                              <TableCell  align={'left'}>
                                {row.totalAmount}
                              </TableCell>
                              <TableCell  align={'left'}>
                                {row.email}
                              </TableCell>
                              <TableCell  align={'left'}>
                                {row.phone}
                              </TableCell>
                              <TableCell  align={'left'}>
                                {row.method}
                              </TableCell>
                              <TableCell onClick={() => console.log('click')} style={{cursor:'pointer'}}  align={'left'}>
                                {row.status}
                              </TableCell>
                              <TableCell  align={'left'}>
                                {formatDate(row.date)}
                              </TableCell>
                              

                              {/* Action buttons */}
                              <TableCell key={row.id} align={'left'}>
                              <Stack spacing={2} direction="row">
                                {row.status !== 'cancelled'&&(
                                  <EditIcon
                                    style={{
                                      fontSize: "20px",
                                      color: "blue",
                                      cursor: "pointer",
                                    }}
                                    className="cursor-pointer"
                                    onClick={() => editstatus(row)}
                                    // onClick={() => handleEditModelOpen(row)}
                                  />

                                )}
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
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Box height={10} />
        </Paper>
      ) : (
        'No Data'
      )}
        </>
    );
}


export default OrderStatus;

