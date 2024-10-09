import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment,Button } from '@mui/material';
import './CreateAccount.css'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import backgroundImage from '../assets/Login.jpg'; // Adjust path accordingly
import { saveEmpDetail } from '../Services/Services';
import { useNavigate } from 'react-router-dom';


export default function CreateAccount() {
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const navigate=useNavigate();
    const handleClickShowPassword  =()=>{
        setShowPassword(!showPassword)
    };
    //const[firstname,setfirstname ]=usestae('')
    const [formData,setFormData]=useState({
        empId:'',
        firstName:'',
        lastName:'',
        dateOfBirth:'',
        phoneNumber:'',
        email:'',
        password:'',

    });
    
    const [formErrors, setFormErrors] = useState({
        empId: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
        password: '',
      });

      const handleChange = (e) => {
        const { name, value } = e.target; // Destructuring to get the name and value from the input
        setFormData({
          ...formData,       // Spread the existing form data
          [name]: value,     // Dynamically set the property corresponding to the input's name
        });
      };

      const validate =()=>{
        let isvalid=true;
        const errors={};

        if(!formData.empId){
            errors.empId = "Employe id IS required";
            isvalid=false;
        }
        if(!formData.firstName){
            errors.firstName = "firstName IS required";
            isvalid=false;
        }
        if(!formData.lastName){
            errors.lastName = "lastName IS required";
            isvalid=false;
        }
        if(!formData.dateOfBirth){
            errors.dateOfBirth = "dateOfBirth IS required";
            isvalid=false;
        }
        if (!formData.email) {
            errors.email = 'Email is required';
            isvalid=false;
          } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email address is invalid';
            isvalid=false;
          }
          if (!formData.password) {
            errors.password = 'Password is required';
            isvalid=false;
          } 
           if (!formData.phoneNumber) {
            errors.phoneNumber = 'phone number must';
            isvalid=false;
          }

          setFormErrors(errors);
          return isvalid;
      };
      const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        
        if (validate()) {
          console.log('Form data:', formData); // Ensure the form is validated before submitting
            saveEmpDetail(formData) // Call API with form data
            .then((response) => {
                console.log('Form data:', formData); // Log the form data for debugging
                navigate('/login'); // Redirect to login page on success
            });
        }
    };
  return (
    
    <div className='contain'>
        <h2>CreateAccount</h2>
        <p>Stay Upload your Detail</p>
        <form onSubmit={handleSubmit}>
            
            <TextField 
                label="Employee ID"
                variant="outlined"
                fullWidth
                type="number" // Type set to 'number'
                name="empId"
                value={formData.empId}
                onChange={handleChange}
                error={Boolean(formErrors.empId)}
                helperText={formErrors.empId}
                margin="normal"
                
                />
            <TextField 
                label="First Name" 
                variant="outlined"
                fullWidth 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange}
                error={Boolean(formErrors.firstName)} 
                helperText={formErrors.firstName}
                margin="normal"
                />
            <TextField 
                label="Last Name" 
                variant="outlined"
                fullWidth 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange}
                error={Boolean(formErrors.lastName)} 
                helperText={formErrors.lastName}
                margin="normal"
                />
            <TextField 
                 label="Date of Birth" 
                 variant="outlined"
                 fullWidth 
                 type="date" 
                 name="dateOfBirth" 
                 value={formData.dateOfBirth} 
                 onChange={handleChange} 
                 error={Boolean(formErrors.dateOfBirth)} 
                 helperText={formErrors.dateOfBirth} 
                 margin="normal"
                 InputLabelProps={{
                     shrink: true, 
                 }}       
                />
            <TextField 
                label="Email" 
                variant="outlined"
                fullWidth 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                error={Boolean(formErrors.email)} 
                helperText={formErrors.email}
                margin="normal"
                />
            <TextField 
                label="Password" 
                variant="outlined"
                fullWidth 
                name="password" 
                type={showPassword?'text':'password'}
                value={formData.password} 
                onChange={handleChange}
                error={Boolean(formErrors?.password)}
                helperText={formErrors.password}
                margin="normal"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                }}
                />
            <TextField 
                label="PhoneNumber" 
                variant="outlined"
                fullWidth 
                name="phoneNumber" 
                value={formData.phoneNumber} 
                onChange={handleChange}
                error={Boolean(formErrors.phoneNumber)} 
                helperText={formErrors.phoneNumber}
                margin="normal"
                inputProps={{
                    maxLength: 10, // Restrict input to 10 digits
                    
                  }}
                />
            <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                style={{ marginTop: '20px' }}
                >
                Register
            </Button>
            <Button
        color='inherit'
        component={Link}
        to='/login'
      >
        Login
      </Button>
      <Button
        color='inherit'
        component={Link}
        to='/empList'
      >
        empList
      </Button>
        </form>
        </div>
       
  )
}

