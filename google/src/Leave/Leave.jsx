import React,{useState,useEffect} from 'react'
import { TextField,MenuItem,Button} from '@mui/material';
import './Leave.css'
import { leave } from '../Services/Services';

const Leave = () => {
    const setempId=sessionStorage.getItem('empId');
    console.log("leave empId",setempId);
    const cl=12;
    const sl=12;
    const [formData,setFormData]=useState({
        empId:setempId || '',
        leaveType:'sickLeave',
        startDate:'',
        endDate:'',
        reason:'',
        fHDay:'FullDay',

    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        leave(formData).then((response) => {
            setFormData({
                leaveType:'sickLeave',
                startDate:'',
                endDate:'',
                reason:'',
                fHDay:'',
              });

        });
      };
  return (
    <div className='leave'>
        <h4 style={{marginTop:'-70px'}}>Applay Leave</h4>
        <form onSubmit={handleSubmit}>
        {/* <TextField label="Project Name" name="projectName" variant="standard" fullWidth sx={{ flexBasis: '23%' }} value={formData.leaveType} /> */}
        <TextField
            label="leavetype"
            variant="standard"
            fullWidth
            sx={{ flexBasis: '23%', marginTop: '10px',width:'210px' }}
            InputLabelProps={{ shrink: true }}
            value={formData.leaveType} 
            select 
            onChange={handleChange}
            name="leaveType"
          >

            <MenuItem value="sickLeave" >sickLeave</MenuItem>
            <MenuItem value="casualLeave" >casualLeave</MenuItem>
          </TextField>
          <TextField label="Start Date" name="startDate" variant="standard" fullWidth sx={{ flexBasis: '13%' }} type="date" InputLabelProps={{ shrink: true }} value={formData.startDate} style={{ width:'210px',marginTop:'10px',marginLeft:'50px'}} onChange={handleChange} />
          <TextField label="endDate" name="endDate" variant="standard" fullWidth sx={{ flexBasis: '23%' }} type="date" InputLabelProps={{ shrink: true }} value={formData.endDate} style={{marginTop:'20px' , width:'210px'}} onChange={handleChange} />
          <TextField
            label="fHDay"
            variant="standard"
            fullWidth
            sx={{ flexBasis: '23%', marginTop: '-50px',width:'210px',marginLeft:'270px'}}
            InputLabelProps={{ shrink: true }}
            value={formData.fHDay} 
            select 
            onChange={handleChange}
            name="fHDay"
          >

            <MenuItem value="HalfDay" >HalfDay</MenuItem>
            <MenuItem value="FullDay" >FullDay</MenuItem>
          </TextField>
          <TextField label="reason" name="reason" variant="standard" type='textarea' fullWidth sx={{ flexBasis: '23%' }} multiline rows={2} value={formData.reason} style={{marginTop:'10px',width:'310px',marginLeft:'7px'}} onChange={handleChange} />
          
          <Button variant="contained" type="submit" style={{ marginTop: '36px',marginLeft:'90px' }}>Submit</Button> 


    {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
</form>
<div className='totalleave'>
  <p >Toatl CL: {cl}</p>
  <p>Toatl SL: {sl}</p>

</div>
    </div>
 
    
  )
}

export default Leave