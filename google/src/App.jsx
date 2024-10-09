import logo from './logo.svg';
import './App.css';
import CreateAccount from  './CreateAccount/CreateAccount';
import ChangePassword from './ChangePassword/ChangePassword';
import Home from './Home/Home';
import LoginPage from './Login/Login';
import Header from './Component/HeaderComponent';
import {  Route, Routes, useLocation } from 'react-router-dom';
import EmpList from './Component/EmpList';
import WriteTask from './Task/writeTask';
import Task from './Task/Task';
import Leave from './Leave/Leave';




function App() {
  const location = useLocation();
    const isLoginPage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/CreateAccount';
    console.log("isLoginPage",isLoginPage);
  return (
    <div className="App">
     
      {!isLoginPage &&<Header />}
        <Routes>
        <Route path="/" Component={LoginPage}></Route>
        <Route path='/CreateAccount' element={<CreateAccount />} />
        <Route path='/ChangePassword' element={<ChangePassword />}></Route>
       
        <Route path='/login' element={<LoginPage />} />
        <Route path='/EmpList' element={<EmpList />} />
        <Route path='/Home' element={<Home/>} />
        <Route path='/WriteTask' element={<WriteTask/>} />
        <Route path='/Task' element={<Task/>} />
        <Route path='/Leave' element={<Leave/>} />
        </Routes>
      
    </div>
  );
}

export default App;
