import React, { useState, useEffect, useCallback } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LOGOUT } from '../../constants/actionTypes';
import decode from 'jwt-decode';


const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();

  

  const logout = useCallback(() => {
    dispatch({ type: LOGOUT });
    navigate('/auth');
    setUser(null);
  }, [dispatch, navigate])
    
  useEffect(() => {
    
    const token = user?.token
    if(token) {
      const decodedToken = decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, user, logout]);
  

  return (
    <AppBar className = {classes.appBar} position="static" color="inherit">
        <Link to='/' className={classes.brandContainer}>
            <img src={memoriesText} alt ='icon' height='45px'/>
            <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
        </Link>
        <Toolbar className= {classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user?.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography variant="h6" className={classes.username}>{user.result.name}</Typography>
                    <Button variant='contained' className={classes.logout} color='secondary' onClick = {logout}>Logout</Button>
                </div>
            ): (
                <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
            )}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar