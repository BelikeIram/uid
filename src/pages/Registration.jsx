import React, { useState } from 'react'
import {Box, Typography} from '@mui/material'
import RegisterForm from '../components/RegisterForm'
import ProfilePhotoUpload from '../components/ProfilePhotoUpload';


const Registration = () => {


  return (
      <Box
      >
         <Typography
           variant='h4'
           component='h4'
           sx={{
               display : 'inline-block',
               textAlign : 'center',
               width : '100%',
           }}
         >
            Registration Form
         </Typography>
         <Box
           sx={{
               marginTop : '20px',
               display : 'flex',
               flexDirection : 'column'
           }}
         >
            <RegisterForm/>
         </Box>
      </Box>
  )
}

export default Registration