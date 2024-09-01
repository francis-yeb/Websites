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
import useProductActions from '../../../redux/useHooks/useProductActions';
import FadeSpinner from '../../../spinners/FadeSpinner';
import axios from '../../../api/axios'






export default function AddCustomerForm({closeEvent}) {
  const {productSize,getProductSizes,productCategories,product,addProduct,error,
    getProductCategory,productGenders,getProductGender,loading} = useProductActions();
  // const {shoeSizes,clothingSizes} = productSize || {};

  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  // console.log("Product eeeerrrro ",errors && errors)
  
  const [inputs, setInputs] = useState({
    name: '',
    phone_number: '',
    email: '',
    address: '',
    city: 'Clothings',
    image: ''
  });

  // useEffect(() => {
  //   getProductSizes();
  //   getProductCategory();
  //   getProductGender();
    
  // },[]);
  useEffect(() => {
    setErrors(error || {})
  },[error]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'image'){
      const selectedFile = event.target.files[0];
      console.log('selected file', selectedFile)
      setInputs(prevValues => ({...prevValues, [name]: selectedFile}))
    }else {
      setInputs(prevValues => ({ ...prevValues, [name]: value }));
    }
    setErrors(prevErrors => {
      return {...prevErrors, [name]: null};
  });
    
  };
  
  const handleImageUpload =()=>{
    fileInputRef.current.click();
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    addProduct({...inputs},closeEvent)
    console.log('image ', inputs)
  }
  return (
    <>
        <div style={{maxHeight: '80vh',overflowY: 'auto'}}>
          <Box sx={{m:2}}>
            <Typography  variant="h5" align='center'>
              Add Customer
            </Typography>
            <Box height={50}/>
            <IconButton
            style = {{position: "absolute",top:"0",right: "0"}}
            onClick={closeEvent}>
              <CloseIcon/>
            </IconButton>
            <form  onSubmit={handleSubmit}  enctype="multipart/form-data">
              <Grid container spacing={2}>
                  {/* Product image */}

                <div style={{margin:'auto',objectFit:'cover'}} onClick={handleImageUpload}>
                  <Grid item xs={12}>
                    {inputs.image ?(
                      <>

                        <img  src={URL.createObjectURL(inputs.image)} width={150} height={100}/>
                      </>
                    ):(
                      <>
                        <img  src="/upload.png" width={100} height={80} />
                      </>
                    )}
                   
                    <input type='file'style={{display:'none'}} ref={fileInputRef} name='image' size={'small'} onChange={handleChange}/>
                  </Grid>
                </div>

                  {/* The product name field */}
                <Grid item xs={12}>
                  <TextField
                      type='text'
                      label="Name"
                      name='name'
                      onChange={handleChange}
                      size='small'
                      sx={{minWidth:'100%'}}
                      value={inputs.name}
                      >
                        
                    </TextField>
                    {errors && errors.name && <p style={{color:'red'}}>{errors.name}</p>}
                </Grid>

                

                {/* Phone number of the customer */}
                <Grid item xs={12}>
                  <TextField
                  id="standard-select-phone"
                  // select
                  label="Phone Number"
                  name='phone_number'
                  value={inputs.phone_number}
                  onChange={handleChange}
                  helperText="Please select your phone number"
                  size='small'
                  sx={{minWidth:'100%'}}
                  >
                
                  </TextField>
                  {errors && errors.phone && <p style={{color:'red'}}>{errors.phone}</p>}
                </Grid>

                {/* Email of the customer */}
                <Grid item xs={12}>
                  <TextField
                  id="standard-select-email"
                  // select
                  label="Email"
                  name='email'
                  value={inputs.email}
                  onChange={handleChange}
                  helperText="Please select your email"
                  size='small'
                  sx={{minWidth:'100%'}}
                  >
                
                  </TextField>
                  {errors && errors.email && <p style={{color:'red'}}>{errors.email}</p>}
                </Grid>

                {/* Address of the customer */}
                <Grid item xs={12}>
                  <TextField
                  id="standard-select-address"
                  // select
                  label="Address"
                  name='address'
                  value={inputs.address}
                  onChange={handleChange}
                  helperText="Please select your address"
                  size='small'
                  sx={{minWidth:'100%'}}
                  >
                
                  </TextField>
                  {errors && errors.address && <p style={{color:'red'}}>{errors.address}</p>}
                </Grid>

                {/* City of the customer */}
                <Grid item xs={12}>
                  <TextField
                  id="standard-select-city"
                  // select
                  label="City"
                  name='city'
                  value={inputs.city}
                  onChange={handleChange}
                  helperText="Please select your city"
                  size='small'
                  sx={{minWidth:'100%'}}
                  >
                
                  </TextField>
                  {errors && errors.city && <p style={{color:'red'}}>{errors.city}</p>}
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