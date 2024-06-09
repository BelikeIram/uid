
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Typography, InputLabel, Select, MenuItem, FormControl, Button, Modal } from '@mui/material';

import AadharCard from './AadharCard';
import ProfilePhotoUpload from './ProfilePhotoUpload';



let counter = 0;
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:{xs:'90%', md:700},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius:'10px',
  boxShadow: 24,
  p: {xs:'12px', md:4},
};



const generateUniqueId = () => {
  const timestamp = Date.now(); // Current timestamp in milliseconds
  const performanceNow = performance.now().toString().replace('.', ''); // High-resolution timestamp
  counter += 1; // Increment the counter

  return `${timestamp}-${performanceNow}-${counter}`;
}


const RegisterForm = ({setCount, setFormData}) => {
  const [formValues, setFormValues] = useState({
    profile:'',
    fullName: '',
    fatherName: '',
    email: '',
    password: '',
    dob: '',
    contactNumber: '',
    address: '',
    pin: '',
    state: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const [states, setStates] = useState([])

  const [open, setOpen] = React.useState({show:false,data:{}});

  const handleOpen = (uid) => {
     setOpen({show:true, data:{...formValues, uid:uid}})
  }
  const handleClose = () => {
    setOpen({show:false, data:{}})
 }

  

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'fullName':
      case 'fatherName':
        if (!/^[A-Za-z\s]+$/.test(value)) error = 'Only alphabets and spaces are allowed';
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email address';
        break;
      case 'password':
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)) error = 'Password must be at least 8 characters long and include one uppercase letter and one number';
        break;
      case 'dob':
        if (!value) error = 'Date of birth is required';
        break;
      case 'contactNumber':
        if (!/^\d{10}$/.test(value)) error = 'Contact number must be 10 digits';
        break;
      case 'address':
        if (!value.trim()) error = 'Address is required';
        break;
      case 'pin':
        if (!/^\d{6}$/.test(value)) error = 'Pincode must be 6 digits';
        break;
      case 'state':
        if (!value) error = 'state is required';
        break;
      case 'profile':
        if (!/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/.test(value.name)) error = 'Profile Photo is required'  
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    // console.log(files[0].name);

    if(name === 'profile'){
        setFormValues({ ...formValues, [name]: files[0]});
        setFormErrors({ ...formErrors, [name]: validateField(name, files[0]) });
        return;
    }

    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: validateField(name, value) });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    Object.keys(formValues).forEach((key) => {
      const error = validateField(key, formValues[key]);
      if (error) errors[key] = error;
    });
    console.log({formValues});
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
       const uid = generateUniqueId()
       handleOpen(uid)
    }
  };


  useEffect(()=>{
     const fetchData = async () => {
      const token = await axios.get('https://www.universal-tutorial.com/api/getaccesstoken', {
        headers: {
          "Accept": "application/json",
          "api-token": import.meta.env.VITE_API_KEY,
          "user-email": "iramm1159@gmail.com"
        }})
        console.log({token});

       const response = await axios.get('https://www.universal-tutorial.com/api/states/India', {
        headers: {
          "Authorization": `Bearer ${token.data.auth_token}`,
          "Accept": "application/json"
        }})
       setStates(response.data)

     }
     fetchData()
  },[])

  return (
     <>
        <form onSubmit={handleSubmit}>
        <ProfilePhotoUpload handleChange={handleChange} error={formErrors.profile}/>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            rowGap: '20px',
          }}
        >
          <TextField
            id="full-name"
            name="fullName"
            label="Your full name"
            type="text"
            value={formValues.fullName}
            onChange={handleChange}
            error={!!formErrors.fullName}
            helperText={formErrors.fullName}
            sx={{ width: { xs: '100%', md: '48%' } }}
          />
          <TextField
            id="outlined-start-adornment"
            name="fatherName"
            label="Father's name"
            type="text"
            autoComplete="father-name"
            value={formValues.fatherName}
            onChange={handleChange}
            error={!!formErrors.fatherName}
            helperText={formErrors.fatherName}
            sx={{ width: { xs: '100%', md: '48%' } }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            rowGap: '20px',
            marginTop: '20px',
          }}
        >
          <TextField
            id="email"
            name="email"
            label="Your email"
            type="email"
            autoComplete="email"
            value={formValues.email}
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
            sx={{ width: { xs: '100%', md: '48%' } }}
          />
          <TextField
            id="password"
            name="password"
            label="Your password"
            type="password"
            autoComplete="password"
            value={formValues.password}
            onChange={handleChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
            sx={{ width: { xs: '100%', md: '48%' } }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            rowGap: '20px',
            marginTop: '20px',
          }}
        >
          <TextField
            id="dob"
            name="dob"
            label="DOB"
            type="date"
            autoComplete="dob"
            value={formValues.dob}
            onChange={handleChange}
            error={!!formErrors.dob}
            helperText={formErrors.dob}
            sx={{ width: { xs: '100%', md: '48%' } }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            id="outlined-number"
            name="contactNumber"
            label="Contact Number"
            type="number"
            value={formValues.contactNumber}
            onChange={handleChange}
            error={!!formErrors.contactNumber}
            helperText={formErrors.contactNumber}
            sx={{ width: { xs: '100%', md: '48%' } }}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <TextField
          id="address"
          name="address"
          label="Your Address"
          type="text"
          value={formValues.address}
          onChange={handleChange}
          error={!!formErrors.address}
          helperText={formErrors.address}
          sx={{
            width: '100%',
            marginTop: '20px',
            '.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { height: '70px' },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            rowGap: '20px',
            marginTop: '20px',
          }}
        >
          <TextField
            id="pin"
            name="pin"
            label="Pincode"
            type="number"
            autoComplete="pincode"
            value={formValues.pin}
            onChange={handleChange}
            error={!!formErrors.pin}
            helperText={formErrors.pin}
            sx={{ width: { xs: '100%', md: '48%' } }}
            InputLabelProps={{ shrink: true }}
          />
          <Box sx={{ minWidth: 120, width: { xs: '100%', md: '48%' } }}>
            <FormControl fullWidth error={!!formErrors.state}>
              <InputLabel id="demo-simple-select-label">state</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="state"
                value={formValues.state}
                onChange={handleChange}
                label="State"
              >   
                {states && states?.map((data)=>(
                  <MenuItem value={data.state_name}>{data.state_name}</MenuItem>
                ))} 
              </Select>
              {formErrors.state && <Typography color="error">{formErrors.state}</Typography>}
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            textAlign: 'center',
            padding: '30px',
          }}
        >
          <Button variant="contained" type="submit" sx={{ width: '60%', padding: '10px', background: 'rgb(160,210,217)', border: 'none' }}>
              Submit
          </Button>
        </Box>
      </form>
      <Modal
        open={open.show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AadharCard open={open} setOpen={setOpen}/>
        </Box>
    </Modal>
     </>
  );
};

export default RegisterForm;