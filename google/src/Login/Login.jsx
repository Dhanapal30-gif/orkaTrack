import React, { useState, useEffect } from 'react';
import { TextField, IconButton, InputAdornment, Button, Snackbar, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { loginEmp } from '../Services/Services';
import './Login.css';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupSeverity, setPopupSeverity] = useState('success');
    const [formData, setFormData] = useState({ empId: '', password: '' });
    const [formErrors, setFormErrors] = useState({ empId: '', password: '' });
    const logindata={
        empId:formData.empId,
        password:formData.password
    };
    useEffect(() => {
        console.log('Snackbar opened:', open);
    }, [open]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let isValid = true;
        const errors = {};
        if (!formData.empId) {
            errors.empId = 'Employee ID is required';
            isValid = false;
        }
        if (!formData.password) {
            errors.password = 'Password is required';
            isValid = false;
        }
        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        if (validate()) {
            loginEmp(formData)
                .then((response) => {
                    console.log('empId',response.data.empId)
                    //const empId = response.data.empId;
                    const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
                    const empId = data.empId;
                    sessionStorage.setItem('empId',empId);
                    //console.log('session:', sessionStorage.setItem('empId',response.data.empId));
                    console.log('session',sessionStorage.getItem('empId'));
                    setPopupMessage(`Login successful! Employee ID: ${response.data.empId}`);
                    setPopupSeverity('success');
                    setOpen(true); // Show Snackbar
                    setTimeout(() => {
                        navigate('/Home');
                    }, 1000); // Adjust as needed
               
                })
                .catch((error) => {
                   
                    setPopupMessage(error.response.data);
                    setPopupSeverity('error');
                    setOpen(true); // Show Snackbar
                });
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

 
    return (
        <div >
        <div className='contain1'>
            <h4>OrkaTrack</h4>
            
            <p style={{marginLeft:'70px'}}>Please Login</p>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Employee ID"
                    variant="outlined"
                    fullWidth
                    name="empId"
                    value={formData.empId}
                    onChange={handleChange}
                    error={Boolean(formErrors.empId)}
                    helperText={formErrors.empId}
                    margin="normal"
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    error={Boolean(formErrors.password)}
                    helperText={formErrors.password}
                    margin="normal"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '20px' }}>
                    Login 
                </Button>
                <Button color="success" component={Link} to='/CreateAccount' style={{ textTransform: 'none' }}>Register</Button> 
                <Button color="success" component={Link} to='/ChangePassword' style={{ textTransform: 'none' }}>ChangePassword</Button>
            </form>

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={popupSeverity} sx={{ width: '100%',marginTop:'90px' }}>
                    {popupMessage}
                </Alert>
            </Snackbar>
        </div>
        </div>
    );
}