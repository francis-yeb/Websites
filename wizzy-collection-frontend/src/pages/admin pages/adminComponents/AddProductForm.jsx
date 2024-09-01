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






export default function AddProductForm({closeEvent}) {
  const {productSize,getProductSizes,productCategories,product,addProduct,error,
    getProductCategory,productGenders,getProductGender,loading} = useProductActions();
  const {shoeSizes,clothingSizes} = productSize || {};

  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  // console.log("Product eeeerrrro ",errors && errors)
  const [inputs, setInputs] = useState({
    title: '',
    price: '',
    brand: '',
    stock_quantity: '',
    category: 'Clothings',
    size: 'S',
    gender: 'Men',
    description: '',
    image: ''
  });

  useEffect(() => {
    getProductSizes();
    getProductCategory();
    getProductGender();
    
  },[]);
  useEffect(() => {
    setErrors(error || {})
  },[error]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'category') {
      // Set initial size based on category
      const initialSize = value === 'Shoes' ? '6' : 'S';
      setInputs(prevValues => ({ ...prevValues, [name]: value, size: initialSize }));
    } else if (name === 'image'){
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
    // console.log('image ', inputs)
  }
  return (
    <>
        <div style={{maxHeight: '80vh',overflowY: 'auto'}}>
          <Box sx={{m:2}}>
            <Typography  variant="h5" align='center'>
              Add Product
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

                {/* The product title field */}
                <Grid item xs={12}>
                  <TextField
                      type='text'
                      label="Title"
                      name='title'
                      onChange={handleChange}
                      size='small'
                      sx={{minWidth:'100%'}}
                      >
                    </TextField>
                    {errors.title && <p style={{color:'red'}}>{errors.title}</p>}
                </Grid>

                

                {/* Categories of the product */}
                {inputs.category &&<Grid item xs={6}>
                  <TextField
                  id="standard-select-category"
                  select
                  label="Category"
                  name='category'
                  value={inputs.category}
                  onChange={handleChange}
                  helperText="Please select your category"
                  size='small'
                  sx={{minWidth:'100%'}}
                  >
                
                  {productCategories && productCategories.categories.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                  ))}
                  </TextField>
                  {errors.category && <p style={{color:'red'}}>{errors.category}</p>}
                </Grid>}

                {/* Shoe size */}
                {productCategories && inputs.category === 'Shoes'&&    <Grid item xs={6}>
                      <TextField
                      id="standard-select-category"
                      select
                      label="Shoe Sizes"
                      value={inputs.size}
                      name='size'
                      onChange={handleChange}
                      helperText="Please select the shoe size"
                      size='small'
                      sx={{minWidth:'100%'}}
                      >
                    
                      {shoeSizes&&shoeSizes.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                      ))}
                      </TextField>
                      {errors.size && <p style={{color:'red'}}>{errors.size}</p>}
                    </Grid>}

                {/* Clothing size */}
                { productCategories && inputs.category === 'Clothings'&&    <Grid item xs={6}>
                      <TextField
                      id="standard-select-category"
                      select
                      label="Clothing Sizes"
                      value={inputs.size}
                      name='size'
                      onChange={handleChange}
                      helperText="Please select the clothing size"
                      size='small'
                      sx={{minWidth:'100%'}}
                      >
                    
                      {clothingSizes&&clothingSizes.map((option) => (
                        <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                      ))}
                      </TextField>
                      {errors.size && <p style={{color:'red'}}>{errors.size}</p>}
                    </Grid>}

                  { productCategories && (<>

                        {/* The price of the product */}
                  <Grid item xs={6}>
                    <TextField
                      label="Price"
                      name='price'
                      onChange={handleChange}
                      size='small'
                      sx={{minWidth:'100%'}}
                      >
                    </TextField>
                    {errors.price && <p style={{color:'red'}}>{errors.price}</p>}
                  </Grid>
                  {/* The price of the product */}


                {/* Genders of the product */}
                <Grid item xs={6}>
                  <TextField
                  id="standard-select-category"
                  select
                  label="Gender"
                  name='gender'
                  value={inputs.gender}
                  onChange={handleChange}
                  helperText="Please select the product gender"
                  size='small'
                  sx={{minWidth:'100%'}}
                  >
                
                  {productGenders && productGenders.genders.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                  ))}
                  </TextField>
                  {errors.gender && <p style={{color:'red'}}>{errors.gender}</p>}
                </Grid>

                  {/* The product brand */}
                  <Grid item xs={6}>
                    <TextField
                      label="Brand"
                      name='brand'
                      onChange={handleChange}
                      size='small'
                      sx={{minWidth:'100%'}}
                      >
                    </TextField>
                    {errors.brand && <p style={{color:'red'}}>{errors.brand}</p>}
                  </Grid>

                  {/* The product quantity */}
                  <Grid item xs={6}>
                    <TextField
                      label="Stock Quantity"
                      name='stock_quantity'
                      onChange={handleChange}
                      size='small'
                      sx={{minWidth:'100%'}}
                      >
                    </TextField>
                    {errors.stock_quantity && <p style={{color:'red'}}>{errors.stock_quantity}</p>}
                  </Grid>


                {/* Descripiton of the product */}
                    {/* <Box sx={{m:2}}> */}
                  <Grid item xs={12}>
                    <TextField
                    id="outlined-multiline-static"
                    name='description'
                    label="Description"
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    />

                  
                    {errors.description && <p style={{color:'red'}}>{errors.description}</p>}
                </Grid> </>)   
                  }
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