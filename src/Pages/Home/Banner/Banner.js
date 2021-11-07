import React from 'react';
import chair from '../../../images/chair.png'
import bg from '../../../images/bg.png'
import Grid from '@mui/material/Grid';
import { Button, Typography, Container} from '@mui/material';
import  Box  from '@mui/material/Box';


const bannerBg = {
    background : `URL($(bg))`,
   
}

const varticalCenter ={
    display : 'flex',
    alignItems: 'center',
    height : 400

}
const Banner = () => {
    return (
        <Container style = {bannerBg} sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            <Grid item style={{...varticalCenter, textAlign :'left'}} xs={12} md={6}>
                <Box>
                <Typography variant = 'h3'>
                    Your New Smile <br />
                    starts here
                </Typography>
                <Typography variant ='h6' sx = {{ my:3,fontSize : 13, fontWeight : 300, color: 'gray'}}>
                    consectetur adipisicing elit. Laboriosam sit necessitatibus, recusandae iusto, distinctio odio laudantium, officia iste accusamus quod voluptates consectetur porro velit sunt totam. Dicta quasi eum praesentium?
                </Typography>
                <Button variant="contained">Get Appointment</Button>
                </Box>
                

            </Grid>
            <Grid item xs={12} md={6} style ={varticalCenter}>
                <img style = {{width:'350px'}} src= {chair} alt="" />
            </Grid>
            
        </Grid>
        </Container>
    );
};

export default Banner;