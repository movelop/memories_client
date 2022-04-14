import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const classes = useStyles();
    const [form, setForm] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleShowConfirm = () => setShowConfirm(!showConfirm);

    const switchMode = () => {
        setIsSignUp((prev) => !prev);
        setShowPassword(false);
    }

    const handleSubmit = () => {

    }

    const handleChange = (e) => {
        
    }

    return (
        <Container component= 'main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? "Sign Up" : "Sign In" }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignUp && <Input name="confirmPassword" label="Repeat Password"  handleChange={handleChange} type={showConfirm ? 'text' : 'password'} handleShowPassword = {handleShowConfirm} /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignUp ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick= {switchMode}>
                                { isSignUp ? 'Already have an account? Sign In' : `Dont have an account? Sign Up` }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth