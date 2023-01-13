import React from 'react'
import { BrowserRouter, Route, Routes    } from "react-router-dom";
import Navbar from '../Components/Navbar/Navbar';
import Home from '../Pages/Home/Home';
import Loginlogout from '../Pages/Login/Login_logout';
import Forgot from '../Pages/Login/Forgot';
import Protected from"./Protected";
import Category from '../Pages/Category/Category';
import SubCategory from "../Pages/SubCategory/SubCategory";
import countries from "../Pages/Countries/Countries";
import State from "../Pages/States/State";
import City  from "../Pages/City/City"
import  Tax from "../Pages/Tax/Tax"
import Discount from "../Pages/Discount/Discount"
import Flavour from "../Pages/Flavour/Flavour"
import Netweight from "../Pages/NetWeight/NetWeight"
import Store from '../Pages/Store/Store';
import Brand from '../Pages/Brand/Brand';
import Product from "../Pages/Product/Product"
import News from '../Pages/News/News';
import Coupon from "../Pages/Coupon/Coupon"
import  GiftVoucher from "../Pages/GiftVoucher/GiftVoucher"

export default function Router() {
 
 

  return (
    

      <BrowserRouter >
        <Navbar></Navbar>
        <Routes>
         <Route   path="/Login" element={<Protected Component={Loginlogout } />}/>
         <Route exact path="/" element={<Protected Component={Home } />} /> 
         <Route path="/category" element={<Protected Component={Category } />} /> 
         <Route path="/subCategory" element={<Protected Component={SubCategory } />} /> 
         <Route path="/Countries" element={<Protected Component={countries} />} /> 
         <Route path="/States" element={<Protected Component={State} />} /> 
         <Route path="/City" element={<Protected Component={City} />} /> 
         <Route path="/Tax" element={<Protected Component={Tax} />} /> 
         <Route path="/Discount" element={<Protected Component={Discount} />} /> 
         <Route path="/Flavour" element={<Protected Component={Flavour} />} /> 
         <Route path="/Netweight" element={<Protected Component={Netweight} />} /> 
         <Route path="/Store" element={<Protected Component={Store} />} />   
         <Route path="/Brand" element={<Protected Component={Brand} />} />   
         <Route path="/Product" element={<Protected Component={Product} />} /> 
        <Route path="/News" element ={<Protected Component ={News}/>}/>
        <Route path="/Coupon" element ={<Protected Component ={Coupon}/>}/>
        <Route path="/GiftVoucher" element = {<Protected Component = {GiftVoucher} />} />
           <Route path='/Forgot' element={<Forgot />}/>
       
        </Routes>
      </BrowserRouter>
      
  
  )
}
