import React from 'react'
import { BrowserRouter, Route, Routes    } from "react-router-dom";
import Navbar from '../Components/Navbar/Navbar';
import Home from '../Pages/Home/Home';
import Loginlogout from '../Pages/Login/Login_logout';
import Forgot from '../Pages/Login/Forgot';
import Protected from"./Protected";
import Category from '../Pages/Category/Category';
import SubCategory from "../Pages/SubCategory/SubCategory"
export default function Router() {
 
 

  return (
    

      <BrowserRouter >
        <Navbar></Navbar>
        <Routes>
         
         <Route exact path="/" element={<Loginlogout />}/>
         <Route path="/home" element={<Protected Component={Home } />} /> 
         <Route path="/category" element={<Protected Component={Category } />} /> 
         <Route path="/subCategory" element={<Protected Component={SubCategory } />} /> 
          <Route path='/Forgot' element={<Forgot />}/>
       
        </Routes>
      </BrowserRouter>
      
  
  )
}
