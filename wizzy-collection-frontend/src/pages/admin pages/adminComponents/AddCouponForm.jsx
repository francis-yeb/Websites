  import {Typography,Box }from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';
  import IconButton from '@mui/material/IconButton';
  import Grid from '@mui/material/Grid';
  import TextField from '@mui/material/TextField';
  import Button from '@mui/material/Button'
  import MenuItem from '@material-ui/core/MenuItem';
  import React,{ useEffect, useState,useRef } from 'react';
  // import { makeStyles } from '@material-ui/core/styles';
  // import { Toast } from 'primereact/toast';
  // import { FileUpload } from 'primereact/fileupload';
  import FadeSpinner from '../../../spinners/FadeSpinner';
  import useCouponActions from '../../../redux/useHooks/useCouponActions';


  const type = ['fixed','percent']



  export default function AddCouponForm({closeEvent}) {
      const {error,addCoupon,loading} = useCouponActions();

    const fileInputRef = useRef(null);
    const [errors, setErrors] = useState({});
    // console.log("Product eeeerrrro ",errors && errors)
    
    const [inputs, setInputs] = useState({
      code: '',
      type: '',
      value: '',
      percent_off: '',
      start_date: '',
      expire_date: ''
    });

    useEffect(() => {
      
      
    },[]);
    useEffect(() => {
      setErrors(error || {})
    },[error]);


    const handleChange = (event) => {
      const { name, value } = event.target;
      // if (code === 'expire_date'){
      //   const selectedFile = event.target.files[0];
      //   console.log('selected file', selectedFile)
      //   setInputs(prevValues => ({...prevValues, [code]: selectedFile}))
      // }else {
        const newValue = name === 'code' ? value.toUpperCase() : value;
        setInputs(prevValues => ({ ...prevValues, [name]: newValue }));
      // }
      setErrors(prevErrors => {
        return {...prevErrors, [name]: null};
    });
      
    };
    
    const handleImageUpload =()=>{
      fileInputRef.current.click();
    }

    const handleSubmit = async(event) => {
      event.preventDefault();
      addCoupon({...inputs},closeEvent)
      // console.log('form data ', inputs)
    }
    return (
      <>
          <div style={{maxHeight: '80vh',overflowY: 'auto'}}>
            <Box sx={{m:2}}>
              <Typography  variant="h5" align='center'>
                Add Coupon
              </Typography>
              <Box height={50}/>
              <IconButton
              style = {{position: "absolute",top:"0",right: "0"}}
              onClick={closeEvent}>
                <CloseIcon/>
              </IconButton>
              <form  onSubmit={handleSubmit}  enctype="multipart/form-data">
                <Grid container spacing={2}>
                    {/* Product expire_date */}

                  

                    {/* Coupon code */}
                  <Grid item xs={12}>
                    <TextField
                        type='text'
                        label="Code"
                        name='code'
                        onChange={handleChange}
                        size='small'
                        sx={{minWidth:'100%'}}
                        value={inputs.code}
                        inputProps={{ style: { textTransform: "uppercase" } }}
                        >
                          
                      </TextField>
                      {errors && errors.code && <p style={{color:'red'}}>{errors.code}</p>}
                  </Grid>

                  

                  {/* Coupon Type */}
                  <Grid item xs={12}>
                    <TextField
                    id="Standard Select-type"
                    select
                    label="Type"
                    name='type'
                    value={inputs.type}
                    onChange={handleChange}
                    helperText="Select the type"
                    size='small'
                    
                    sx={{minWidth:'100%'}}
                    >

                      {type && type.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  
                    </TextField>
                    {errors && errors.type && <p style={{color:'red'}}>{errors.type}</p>}
                  </Grid>

                  {/* Coupon value */}
                  
                    {inputs.type === 'fixed' && (
                      <Grid item xs={12}>
                        <TextField
                        id="value"
                        // select
                        label="Value"
                        name='value'
                        value={inputs.value}
                        onChange={handleChange}
                        helperText="Enter the value"
                        size='small'
                        sx={{minWidth:'100%'}}
                        >
                      
                        </TextField>
                        {errors && errors.value && <p style={{color:'red'}}>{errors.value}</p>}
                      </Grid>
                  )}

                  {/* Coupon percent_off*/}
                  {inputs.type === 'percent' && (
                    <Grid item xs={12}>
                      <TextField
                      id="percent_off"
                      // select
                      label="Percent Off"
                      name='percent_off'
                      value={inputs.percent_off}
                      onChange={handleChange}
                      helperText="Enter the percent off"
                      size='small'
                      sx={{minWidth:'100%'}}
                      >
                    
                      </TextField>
                      {errors && errors.percent_off && <p style={{color:'red'}}>{errors.percent_off}</p>}
                    </Grid>
                  )}

                  {/* Coupon Starting date*/}
                  <Grid item xs={12}>
                    <TextField
                    id="standard-select-start_date"
                    // select
                    type='date'
                    // label="City"
                    name='start_date'
                    value={inputs.start_date}
                    onChange={handleChange}
                    helperText="Please select your start_date"
                    size='small'
                    sx={{minWidth:'100%'}}
                    >
                  
                    </TextField>
                    {errors && errors.start_date && <p style={{color:'red'}}>{errors.start_date}</p>}
                  </Grid>

                  {/* Coupon Expiring date*/}
                  <Grid item xs={12}>
                    <TextField
                    id="standard-select-expire_date"
                    // select
                    type='date'
                    // label="City"
                    name='expire_date'
                    value={inputs.expire_date}
                    onChange={handleChange}
                    helperText="Please select your start_date"
                    size='small'
                    sx={{minWidth:'100%'}}
                    >
                  
                    </TextField>
                    {errors && errors.start_date && <p style={{color:'red'}}>{errors.start_date}</p>}
                  </Grid>


                  <Grid item xs={12}>
                      <Typography  variant="h5" align='center'>
                        <Button type='submit' on variant="contained" >

                          {loading? <FadeSpinner/>: "Submit"}
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