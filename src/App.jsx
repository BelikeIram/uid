import { useState } from 'react'
import { Box } from '@mui/material'

import './App.css'
import Bg from './assets/bg.jpg'
import Registration from './pages/Registration'




function App() {

  return (
    <>
      <Box
         sx={{
           backgroundImage : `url(${Bg})`,
           backgroundPosition:'center',
           backgroundSize : 'cover',
           minHeight : '100vh',
           height:'auto',
           width : '100vw',
           padding : '20px'
         }}
      >
          <Box
             sx={{
               width : {xs : '100%', sm : '80%', md:'60%'},
               backgroundColor : '#ffff',
               borderRadius:'10px',
               margin : '0 auto',
               marginTop:'20px',
               height : 'auto',
               padding : '20px',
               boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
             }}
          >
             <Registration/>
          </Box>
          
      </Box>
    </>
  )
}

export default App
