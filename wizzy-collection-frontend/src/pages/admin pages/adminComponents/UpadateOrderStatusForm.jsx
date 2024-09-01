import {Typography,Box }from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import MenuItem from '@material-ui/core/MenuItem';
import { useEffect, useState } from 'react';

import FadeSpinner from '../../../spinners/FadeSpinner';
import useOrderActions from '../../../redux/useHooks/useOrderActions';


export default function UpdateOrderStatusForm({closeEvent,formid}) {
  // eslint-disable-next-line no-unused-vars
  const {error,loading,userOrders,updateOrderStatus} = useOrderActions();

  const orderStatus = ["pending","rejected","processing","delivering","delivered"]
  
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    status: '',
  });

  useEffect(() => {
    setInputs({
      id: formid.id,
      status: formid.status,
    })
    console.log("order id",formid.id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {
    setErrors(error || {})
  },[error]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    // if (name === 'category'){
      setInputs(prevValues => ({ ...prevValues, [name]: value }));
    // }
    setErrors(prevErrors => {
      return {...prevErrors, [name]: null};
  });
    
  };
  

  const handleSubmit =  async (event) => {
    event.preventDefault();

    console.log("Submitting data ",inputs)
    console.log("edit dattttt ",)
    await updateOrderStatus(inputs,inputs.id,closeEvent);
  }

  return (
    <>
        <div style={{maxHeight: '80vh',overflowY: 'auto'}}>
          <Box sx={{m:2}}>
            <Typography  variant="h5" align='center'>
              Upadte Order Status
            </Typography>
            <Box height={30}/>
            <IconButton
            style = {{position: "absolute",top:"0",right: "0"}}
            onClick={closeEvent}>
              <CloseIcon/>
            </IconButton>
            <form  onSubmit={handleSubmit}  enctype="multipart/form-data" >
              <Grid container spacing={2}>



                

                {/* Categories of the product */}
                <Grid item xs={12}>
                  <TextField
                  id="standard-select-category"
                  select
                  label="Status"
                  name='status'
                  value={inputs.status}
                  onChange={handleChange}
                  helperText="Please select status"
                  size='small'
                  sx={{minWidth:'100%'}}
                  >
                    {orderStatus.map((option) => (
                      <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                  ))}
                  </TextField>
                  {/* {errors.category && <p style={{color:'red'}}>{errors.category}</p>} */}
                </Grid>

                
                <Grid item xs={12}>
                    <Typography  variant="h5" align='center'>
                      <Button type='submit' on variant="contained" >

                        {loading? <FadeSpinner/>: "Save"}
                      </Button>
                    </Typography>
                </Grid>
              </Grid>
            </form>
          </Box>
        </div>
    </>
  );
}