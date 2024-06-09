import React,{useState} from 'react';
import { Modal, Box, Typography, Avatar, Grid } from '@mui/material';

let counter = 0;

const AadharCard = ({open}) => {
  const {show, data : user} = open
  const [profile, setProfile] = useState()



  if (user.profile) {
    const reader = new FileReader();
    reader.onloadend = () => {
       setProfile(reader.result)
    };
    reader.readAsDataURL(user.profile);   
  }


  return (
    <>
        <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold', color: '#0a3d62' }}>
          Aadhar Card
        </Typography>
        <Box
           sx={{
               display:"flex",
               gap:"20px",
               flexWrap:{xs:'wrap', sm:'nowrap'},
               backgroundColor:'#ded9d93b',
                m:0,
                padding:'20px'
           }}
        >
            <Avatar
            src={profile}
            sx={{
            width: 200,
            height: 200,
            margin: '0 auto 16px',
            border: '2px solid #0a3d62',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
            }}
            />
            <Grid container spacing={2} backgroundColor='#ded9d93b' m={0}  boxShadow = 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' paddingBottom={'20px'}>
                <Grid item xs={12}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Name: <Typography variant="body2" component="span">{user.fullName}</Typography>
                </Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Father's Name: <Typography variant="body2" component="span">{user.fatherName}</Typography>
                </Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Email: <Typography variant="body2" component="span">{user.email}</Typography>
                </Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    DOB: <Typography variant="body2" component="span">{user.dob}</Typography>
                </Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Contact: <Typography variant="body2" component="span">{user.contactNumber}</Typography>
                </Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Address: <Typography variant="body2" component="span">{user.address}</Typography>
                </Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    State: <Typography variant="body2" component="span">{user.state}</Typography>
                </Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    UID: <Typography variant="body2" component="span">{user.uid.slice(0,13)}</Typography>
                </Typography>
                </Grid>
            </Grid>
        </Box>
    </>
  );
};

export default AadharCard;