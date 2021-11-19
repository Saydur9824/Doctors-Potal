import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import login from '../../../images/login.png'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink , useNavigate} from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const Register = () => {
    const[loginData, setLoginData] = useState({})
    const navigate = useNavigate()
    const {user, registerUser, isLoading, authError} = useAuth();

    const handleOnBlur = e =>{
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = {...loginData}
        newLoginData[field] = value;
        setLoginData(newLoginData)
        
    }
    const handleLoginSubmit = e => {
        if(loginData.password !== loginData.password2){
            alert('password not match')
            return
        }
        registerUser(loginData.email, loginData.password, loginData.name, navigate);
        e.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{mt:8}} xs={12} md ={6}>
                <Typography variant="body1" gutterBottom>
                   Register
                </Typography>

                { !isLoading && <form onSubmit = {handleLoginSubmit}>
                <TextField
                    sx = {{width: '75%', m:1}}
                    id="standard-basic"
                    label="Your name" 
                    name = 'name'
                    onBlur = {handleOnBlur}
                    variant="standard"/>
                <TextField
                    sx = {{width: '75%', m:1}}
                    id="standard-basic"
                    label="Your Email" 
                    name = 'email'
                    type = 'email'
                    onBlur = {handleOnBlur}
                    variant="standard"/>
                <TextField
                    sx = {{width: '75%', m:1}}
                    id="standard-basic"
                    label="Your Password"
                    type = 'password'
                    name = 'password'
                    onBlur = {handleOnBlur}
                    variant="standard"/>
                <TextField
                    sx = {{width: '75%', m:1}}
                    id="standard-basic"
                    label="Retype Your Password"
                    type = 'password'
                    name = 'password2'
                    onBlur = {handleOnBlur}
                    variant="standard"/>

                     <Button sx = {{width: '75%', m:1}} type = 'submit' variant="outlined">Register</Button>

                     <NavLink 
                     style = {{textDecoration:'none'}} 
                     to = '/login'>
                        <Button variant="text">Already Register ? Please login</Button>
                     </NavLink>
                </form>}

                {isLoading && <CircularProgress />}

                {user?.email &&  <Alert severity="success">user create successfully!</Alert> }
                {authError &&  <Alert severity="error">{authError}</Alert>}
                
                </Grid>
                <Grid item xs={12} md ={6}>
                    <img style = {{width:'100%'}} src ={login} alt = '' />
                </Grid>
            
            </Grid>
        </Container>
    );
};

export default Register;