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
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useProductActions from '../../../redux/useHooks/useProductActions';
import { useNavigate, useParams } from "react-router-dom";
import { all } from 'axios';
import RectangleSkeleton from '../../skeleton/RectangleSkeleton';

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




const ClothingCategory = () => {
  
  const {getAllCetegoryProducts,categoryProducts} = useProductActions();
  console.log("alllll pro ",categoryProducts)
  
  const navigate = useNavigate();
  
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState([]);
//   console.log("product category..",categories && categories)

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const getProducts = () => {
      // setRows(products);
    }

    useEffect(() => {
      getAllCetegoryProducts("clothings");
    
      if (categoryProducts && categoryProducts.length) {
        setRows(categoryProducts);
      }
    },[categoryProducts]);

    

    return (
        <>
          {rows.length > 0 && (
            
            <Paper className={''}>
        
              <Typography
              gutterBottom
              variant='h5'
              component={'div'}
              sx={{padding:"20px"}}>
                  Clothings 
              </Typography>
          
            
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
                            Title
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: "100px" }}
                        >
                            Category
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: "100px" }}
                        >
                            Gender
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: "100px" }}
                        >
                            Price
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: "100px" }}
                        >
                            Quantity
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ minWidth: "100px" }}
                        >
                            Brand
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
                        <TableRow hover role="checkbox" tabIndex={-1}>
                          
                              <TableCell  align={'left'} >
                                <img onClick={() => navigate(`/products/${row.id}`)} src={row.image} width={50} height={40} alt="" />
                              </TableCell>
                              <TableCell  align={'left'}>
                                {row.title}
                              </TableCell>
                              <TableCell  align={'left'}>
                                {row.category}
                              </TableCell>
                              <TableCell  align={'left'}>
                                {row.gender}
                              </TableCell>
                              <TableCell  align={'left'}>
                                {row.price}
                              </TableCell>
                              <TableCell  align={'left'}>
                                {row.stock_quantity}
                              </TableCell>
                              <TableCell  align={'left'}>
                                {row.brand}
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
                                      // onClick={() => editData(row)}
                                      // onClick={() => handleEditModelOpen(row)}
                                    />
                                    <DeleteIcon
                                      style={{
                                        fontSize: "20px",
                                        color: "darkred",
                                        cursor: "pointer",
                                      }}
                                      // onClick={() => {
                                      //   deleteApi(row.id);
                                      // }}
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
              <Box height={10} />
        
            </Paper>
          )}
          {rows.length === 0 &&(
            <RectangleSkeleton/>
          )}
        </>
    );
}


export default ClothingCategory;

