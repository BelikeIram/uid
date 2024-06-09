import React, { useState, useRef } from 'react';
import { Box, Button, Avatar, Typography } from '@mui/material';
import User from '../assets/user.png'

const ProfilePhotoUpload = ({handleChange, error}) => {
  console.log({error});
  const [selectedImage, setSelectedImage] = useState(User);
  const inputRef = useRef();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
    handleChange(event)
  };

  const handleAvatarClick = () => {
    inputRef.current.click();
  };


  return (
    <>
    <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent:'center',
      margin:'20px',
      mt:0
    }}
  >
    <Avatar
      src={selectedImage}
      alt="Profile Photo"
      sx={{ width: 200, height: 200, cursor:'pointer'}}
      onClick={handleAvatarClick}
    />
    <input
      accept="image/*"
      style={{ display: 'none' }}
      id="profile-photo-upload"
      name='profile'
      type="file"
      onChange={handleImageChange}
      ref={inputRef}
    />
  </Box>
    {error && <Typography color='red' textAlign='center' margin='20px'>{error}</Typography>}
    </>
   
  );
};

export default ProfilePhotoUpload;