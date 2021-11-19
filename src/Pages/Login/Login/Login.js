import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import login from '../../../images/login.png'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const Login = () => {
    const[loginData, setLoginData] = useState({})
    const{user, loginUser, signInWithGoogle, isLoading, authError} = useAuth();
console.log(signInWithGoogle)
    const location = useLocation();
    const navigate = useNavigate();


    const handleOnChange = e =>{
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = {...loginData}
        newLoginData[field] = value;
        setLoginData(newLoginData)
    }
    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, navigate)
        e.preventDefault();
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle(location, navigate)
    }
    
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{mt:8}} xs={12} md ={6}>
                <Typography variant="body1" gutterBottom>
                   Login
                </Typography>
                <form onSubmit = {handleLoginSubmit}>
                <TextField
                    sx = {{width: '75%', m:1}}
                    id="standard-basic"
                    label="Your Email" 
                    name = 'email'
                    type = 'email'
                    onChange = {handleOnChange}
                    variant="standard"/>
                <TextField
                    sx = {{width: '75%', m:1}}
                    id="standard-basic"
                    label="Your Password"
                    type = 'password'
                    name = 'password'
                    onChange = {handleOnChange}
                    variant="standard"/>

                     <Button sx = {{width: '75%', m:1}} type = 'submit' variant="outlined">Login</Button>

                     <NavLink
                     style = {{textDecoration:'none'}} 
                     to = '/register'>
                        <Button style = {{textDecoration:'none'}} variant="text">New uswe ? Please register</Button>
                     </NavLink>

                    {isLoading && <CircularProgress />}

                    {user?.email &&  <Alert severity="success">user create successfully!</Alert> }
                    {authError &&  <Alert severity="error">{authError}</Alert>}
                </form>
                <p>-----------------------------</p>
                <Button onClick= {handleGoogleSignIn} variant="contained">Sign in Google</Button>
                </Grid>
                <Grid item xs={12} md ={6}>
                    <img style = {{width:'100%'}} src ={login} alt = '' />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
