import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Typography} from '@mui/material';
import doctor from '../../../images/doctor.png'
import bg from '../../../images/appointment-bg.png'
import Button from '@mui/material/Button';


const appointmentBanner = {
    background : `url(${bg})`,
    backgroundColor : 'rgba(45, 58, 74, 0.9)',
    backgroundBlendMode : 'darken, luminosity',
    marginTop : 175
}
const AppointmentBanner = () => {
    return (
        <Box style = {appointmentBanner} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
           <img 
            style = {{width:400, marginTop : '-110px'}}
            src= {doctor} alt="" />
          </Grid>


          <Grid item xs={12} md={6}  sx={{ 
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                textAlign : "left"
                
            }}>
           <Box>
           <Typography variant = "h6" sx = {{mb:4}} style ={{color : '#3CE1CB'}}>
                Appointment
            </Typography>
            <Typography variant = "h4" style = {{color : 'white'}}>
                Make an Appointment Today
            </Typography>
            <Typography variant = "h6" sx = {{my:2}} style ={{color : 'white', fontSize :14, fontWeight :300}}>
                Make an Appointment Today  handled by the router: a home page, an about page, and a users page. As you click around on the
            </Typography>
            <Button variant="contained">Learn More</Button>
           </Box>
          </Grid>

        </Grid>
      </Box>
    );
};

export default AppointmentBanner;