import React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import Service from '../Service/Service';
import fluoride from '../../../images/fluoride.png'
import cavity from '../../../images/cavity.png'
import whitening from '../../../images/whitening.png'
import Typography from '@mui/material/Typography'

const services = [
    {
        name : 'Fluoride Treatment',
        description : 'Electronic Forms. Intra-Office Chat. Patient Engagement and more. No Contracts. Month to Month Pricing. Integrates with PMS. Created By a Dentist. Unlimited',
        img : fluoride
    },
    {
        name : 'Cavity Filling',
        description : 'Electronic Forms. Intra-Office Chat. Patient Engagement and more. No Contracts. Month to Month Pricing. Integrates with PMS. Created By a Dentist. Unlimited',
        img : cavity
    },
    {
        name : 'Teeth Whitening',
        description : 'transformation today. Schedule a free Demo and see how YAPI works. Online Patient Forms. Electronic Forms. Intra-Office Chat. Patient Engagement and more. ',
        img : whitening
    }
]


const Services = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Container>
             <Typography sx={{fontWeight: 500, color: 'success.main ',m: 2}} variant="h5" component="div">
                OUR SERVICES
            </Typography>
             <Typography sx={{fontWeight: 600, m: 2}} variant="h4" component="div">
                Services We Provide
            </Typography>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
               {
                   services.map(service =><Service
                   key = {service.name}
                   service = {service}
                   ></Service> )
               }
            </Grid>
        </Container>
        </Box>
    );
};

export default Services;