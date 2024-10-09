import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TextField, Button } from '@mui/material';
import './Task.css';
import { getTask, sendTask } from '../Services/Services';

const WriteTask = () => {
  //Get session storage
  const setempId=sessionStorage.getItem('empId');
  const [updateData, setUpdateData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [getDataTable, setGetDataTable] = useState({ isTrue: true });
  const [employee, setEmployee] = useState([]);
  const [formData, setFormData] = useState({
    empId:setempId ||'',
    projectNo: '',
    projectName: '',
    macroTask: '',
    microTask: '',
    incharge: '',
    startDate: '',
    endDate: '',
    status: 'NotStarted',
  }); 
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; // Set the number of tasks to display per page

  // Calculate the indices of the first and last tasks to display
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = employee.slice(indexOfFirstTask, indexOfLastTask);

  // Calculate total pages
  const totalPages = Math.ceil(employee.length / tasksPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onAddButtonClick = () => {
    if (!formData.projectNo) {
      alert("Project No is required");
      return;
    }
    if (!formData.projectName) {
      alert("Project Name is required");
      return;
    }
    if (!formData.macroTask) {
      alert("macroTask is required");
      return;
    }
    if (!formData.microTask) {
      alert("microTask is required");
      return;
    }
    if (!formData.incharge) {
      alert("incharge is required");
      return;
    }
    if (!formData.startDate) {
      alert("startDate is required");
      return;
    }
    if (!formData.endDate) {
      alert("endDate is required");
      return;
    }

    setUpdateData([...updateData, formData]);
    console.log(updateData);
    //After add the data then setformdata empty
    setFormData({
      projectNo: '',
      projectName: '',
      macroTask: '',
      microTask: '',
      incharge: '',
      startDate: '',
      endDate: '',
      status: 'NotStarted',
    });
    setShowTable(true);
 setGetDataTable(prevState => ({ ...prevState, isFalse: false }));

  };

  const handleDelete = (index) => {
    const updatedProjects = updateData.filter((_, i) => i !== index);
    setUpdateData(updatedProjects);
  };

  const handleEdit = (index) => {
    const projectToEdit = updateData[index];
    console.log('Editing project:', projectToEdit);
    // Implement edit logic here, such as opening a modal or form to edit
  };
  
   useEffect(() => {
    getData();
 }, []);
 const getData =()=>{
  if (getDataTable.isTrue) {  
      getTask().then((response) => {
        console.log("empId", setempId);
          setEmployee(response.data);
      }).catch(error => {
         console.error(error);
      });
  }
 };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendTask(updateData).then((response) => {
      console.log("formData", formData);
      console.log("updatedata", updateData);
      setUpdateData([]);
      setShowTable(false);
      //copy previous state (prevState) and changing the value
      getData(); 
      setGetDataTable(prevState => ({ ...prevState, isTrue: true }));
    });
  };

  // useEffect(() => {
  //   getTask().then((response) => {
  //     setEmployee(response.data);
  //   }).catch(error => {
  //     console.error(error);
  //   });#FFD54F


  // }, []);

  return (
    <div>
      <h2 style={{ margin: '20px', marginTop: '10px', padding: '10px', backgroundColor: 'blueviolet', color: 'white' }}>
        Task
      </h2>
      <form style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }} onSubmit={handleSubmit}>
        <TextField label="Project No" name="projectNo" variant="outlined" fullWidth sx={{ flexBasis: '13%', marginLeft: '20px' }} value={formData.projectNo} onChange={handleChange} required />
        <TextField label="Project Name" name="projectName" variant="outlined" fullWidth sx={{ flexBasis: '23%' }} value={formData.projectName} onChange={handleChange} />
        <TextField label="Macro Task" name="macroTask" variant="outlined" fullWidth sx={{ flexBasis: '23%' }} value={formData.macroTask} onChange={handleChange} />
        <TextField label="Micro Task" name="microTask" type='textarea' fullWidth sx={{ flexBasis: '23%' }} multiline rows={2} value={formData.microTask} onChange={handleChange} />
        <TextField label="Incharge" name="incharge" variant="outlined" fullWidth sx={{ flexBasis: '13%', marginLeft: '20px' }} value={formData.incharge} onChange={handleChange} />
        <TextField label="Start Date" name="startDate" variant="outlined" fullWidth sx={{ flexBasis: '23%' }} type="date" InputLabelProps={{ shrink: true }} value={formData.startDate} onChange={handleChange} />
        <TextField label="End Date" name="endDate" variant="outlined" fullWidth sx={{ flexBasis: '23%' }} type="date" InputLabelProps={{ shrink: true }} value={formData.endDate} onChange={handleChange} />
        <TextField label="Status" name="status" variant="outlined" fullWidth sx={{ flexBasis: '23%' }} value={formData.status} onChange={handleChange} disabled />
        <Button variant="contained" style={{ marginTop: '16px' }} onClick={onAddButtonClick}>ADD</Button>
      </form>

      {showTable && (
        <div>
          <h4>Add Task Details</h4>
          <table>
            <thead>
              <tr>
                <th>ProjectNo</th>
                <th>ProjectName</th>
                <th>MacroTask</th>
                <th>MicroTask</th>
                <th>Incharge</th>
                <th>StartDate</th>
                <th>EndDate</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {updateData.map((taskData, index) => (
                <tr key={index}>
                  <td>{taskData.projectNo}</td>
                  <td>{taskData.projectName}</td>
                  <td>{taskData.macroTask}</td>
                  <td>{taskData.microTask}</td>
                  <td>{taskData.incharge}</td>
                  <td>{taskData.startDate}</td>
                  <td>{taskData.endDate}</td>
                  <td>{taskData.status}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button variant="contained" color="primary" fullWidth type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      )}

      {getDataTable && (
        <div>
          <h6 style={{marginLeft:'-1390px',marginTop:'10px'}}>All Task Details</h6>
          <table>
            <thead>
              <tr>
                <th>ProjectNo</th>
                <th>ProjectName</th>
                <th>MacroTask</th>
                <th>MicroTask</th>
                <th>Incharge</th>
                <th>StartDate</th>
                <th>EndDate</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((taskData, index) => (
                <tr key={index}>
                  <td>{taskData.projectNo}</td>
                  <td>{taskData.projectName}</td>
                  <td>{taskData.macroTask}</td>
                  <td>{taskData.microTask}</td>
                  <td>{taskData.incharge}</td>
                  <td>{taskData.startDate}</td>
                  <td>{taskData.endDate}</td>
                  <td>{taskData.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination" style={{marginLeft:'1430px', color:'aquamarine'}}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WriteTask;