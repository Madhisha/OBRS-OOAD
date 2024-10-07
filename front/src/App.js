import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Find from './component/Find';
import Header from './component/Header';
import Login from './component/Login';
import Register from './component/Register';
import Bus from './component/Bus';
import Payemnt from './component/Payment';

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Find/>}/>
        <Route path='/bus' element={<Bus/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/payment' element={<Payemnt/>}/>
      </Routes>
    </Router> 
  );
};

export default App;