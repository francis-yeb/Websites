/* eslint-disable jsx-a11y/alt-text */
import {Typography,Box }from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { useEffect, useState ,useRef } from 'react';
import useProductActions from '../../../redux/useHooks/useProductActions';
import FadeSpinner from '../../../spinners/FadeSpinner';






export default function EditProductForm({closeEvent,formid}) {
  const {error,loading, editProduct} = useProductActions();

  const [errors, setErrors] = useState({});
  // console.log("Product eeeerrrro ",errors && errors)
  const [inputs, setInputs] = useState({
    id: '',
    title: '',
    price: '',
    brand: '',
    stock_quantity: '',
    category: '',
    size: '',
    gender: '',
    description: '',
    image: ''
  });
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setInputs({
      id: formid.id,
      title: formid.title,
      price: formid.price,
      brand: formid.brand,
      stock_quantity: formid.quantity,
      category: formid.category,
      size: formid.size,
      gender: formid.gender,
      description: formid.description,
    // image: formid.image
    })
    setImageUrl(formid.image)
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    } 
    else if (name === 'image'){
      const selectedFile = event.target.files[0];
      if(selectedFile){
        setInputs(prevValues => ({...prevValues, [name]: selectedFile}))
        const uniqueImage = URL.createObjectURL(selectedFile);
        setImageUrl(uniqueImage)
      }else {
        setInputs(prevValues => ({...prevValues, [name]: selectedFile}))

      }
      // console.log('selected fileeee', selectedFile)
    }
    else {
      setInputs(prevValues => ({ ...prevValues, [name]: value }));
    }
    setErrors(prevErrors => {
      return {...prevErrors, [name]: null};
  });
    
  };
  
  const fileInputRef = useRef(null);

  const handleImageUpload =()=>{
    fileInputRef.current.click();
  }

  const handleSubmit =  (event) => {
    event.preventDefault();

    const formData = new FormData();
        formData.append('_method','patch');
        formData.append('id', inputs.id);
        formData.append('title', inputs.title);
        formData.append('price', inputs.price);
        formData.append('brand', inputs.brand);
        formData.append('stock_quantity', inputs.stock_quantity);
        formData.append('category', inputs.category);
        formData.append('size', inputs.size);
        formData.append('gender', inputs.gender);
        formData.append('description', inputs.description);
        if(inputs.image){
          
          formData.append('image', inputs.image);
        }

    console.log("IDDDD ",inputs.id)
    console.log("edit dattttt ",)
    editProduct(formData,inputs.id,closeEvent);
  }

  return (
    <>
        <div style={{maxHeight: '80vh',overflowY: 'auto'}}>
          <Box sx={{m:2}}>
            <Typography  variant="h5" align='center'>
              Edit Product
            </Typography>
            <Box height={30}/>
            <IconButton
            style = {{position: "absolute",top:"0",right: "0"}}
            onClick={closeEvent}>
              <CloseIcon/>
            </IconButton>
            <form  onSubmit={handleSubmit}  enctype="multipart/form-data" >
              <Grid container spacing={2}>

                {/* Product image */}

                <div style={{margin:'auto'}} onClick={handleImageUpload}>
                    <Grid item xs={12}>

                          <img  src={imageUrl} width={150} height={100}/>
                    
                          <input  type='file'style={{display:'none'}} ref={fileInputRef} name='image' size={'small'} onChange={handleChange}
                      // accept='image/jpeg, image/png, image/jpg, image/gif, image/svg+xml'
                      />
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
                      value={inputs.title}
                      >
                        
                    </TextField>
                    {errors.title && <p style={{color:'red'}}>{errors.title}</p>}
                </Grid>

                

                {/* Categories of the product */}
                <Grid item xs={6}>
                  <TextField
                  id="standard-select-category"
                  // select
                  label="Category"
                  name='category'
                  value={inputs.category}
                  onChange={handleChange}
                  helperText="Please select your category"
                  size='small'
                  sx={{minWidth:'100%'}}
                  >
                
                  </TextField>
                  {errors.category && <p style={{color:'red'}}>{errors.category}</p>}
                </Grid>

                {/* Shoe size */}
                <Grid item xs={6}>
                      <TextField
                      id="standard-select-category"
                      // select
                      label="Sizes"
                      value={inputs.size}
                      name='size'
                      onChange={handleChange}
                      helperText="Please select the shoe size"
                      size='small'
                      sx={{minWidth:'100%'}}
                      >
                    
                      </TextField>
                      {errors.size && <p style={{color:'red'}}>{errors.size}</p>}
                    </Grid>

                

                        {/* The price of the product */}
                  <Grid item xs={6}>
                    <TextField
                      label="Price"
                      name='price'
                      value={inputs.price}
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
                  // select
                  label="Gender"
                  name='gender'
                  value={inputs.gender}
                  onChange={handleChange}
                  helperText="Please select the product gender"
                  size='small'
                  sx={{minWidth:'100%'}}
                  >
                  </TextField>
                  {errors.gender && <p style={{color:'red'}}>{errors.gender}</p>}
                </Grid>

                  {/* The product brand */}
                  <Grid item xs={6}>
                    <TextField
                      label="Brand"
                      name='brand'
                      onChange={handleChange}
                      value={inputs.brand}
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
                      value={inputs.stock_quantity}
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
                    value={inputs.description}
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    />

                  
                    {errors.description && <p style={{color:'red'}}>{errors.description}</p>}
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