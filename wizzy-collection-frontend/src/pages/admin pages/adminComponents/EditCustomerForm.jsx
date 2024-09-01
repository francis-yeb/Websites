import {Typography,Box }from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { useEffect, useState ,useRef } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { Toast } from 'primereact/toast';
// import { FileUpload } from 'primereact/fileupload';
import FadeSpinner from '../../../spinners/FadeSpinner';
import useCustomerActions from '../../../redux/useHooks/useCustomerActions';






export default function EditCustomerForm({closeEvent,formid}) {
  const {error,loading, editCustomer,customers} = useCustomerActions();

  
  
  const [errors, setErrors] = useState({});
  // console.log("Product eeeerrrro ",errors && errors)
  const [inputs, setInputs] = useState({
    id: '',
    name: '',
    phone_number: '',
    email: '',
    address: '',
    city: '',
    image: ''
  });
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setInputs({
      id: formid.id,
      name: formid.name,
      phone_number: formid.phoneNumber,
      email: formid.email,
      address: formid.address,
      city: formid.city,
    
    // image: formid.image
    });
    setImageUrl(formid.image);
    
  },[]);
  useEffect(() => {
    setErrors(error || null)
  },[error]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'city') {
      // Set initial size based on city
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
        formData.append('id', Number(inputs.id));
        formData.append('name', inputs.name);
        formData.append('phone_number', inputs.phone_number);
        formData.append('email', inputs.email);
        formData.append('address', inputs.address);
        // formData.append('city', inputs.city);
        
        if(inputs.image){
          
          formData.append('image', inputs.image);
        }

    console.log("IDDDD ",inputs.id)
    console.log("edit dattttt ")
    editCustomer(formData,inputs.id,closeEvent);
  }

  return (
    <>
        <div style={{maxHeight: '80vh',overflowY: 'auto'}}>
          <Box sx={{m:2}}>
            <Typography  variant="h5" align='center'>
              Edit Customer
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