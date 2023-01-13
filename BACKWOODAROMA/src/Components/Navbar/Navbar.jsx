
import Search from "./Search";
// import Axios from "axios"
import { IoMdMailUnread } from 'react-icons/io';
import { VscBellDot } from 'react-icons/vsc';
import Cookies from 'universal-cookie';
import { Link, useNavigate } from "react-router-dom";
import Createcontext from "../../Hooks/Context/Context"
import React, { useContext } from 'react';
function Navbar() {
  const { dispatch } = useContext(Createcontext)
  const islogin = useContext(Createcontext)
  const cookies = new Cookies();
  const navigate = useNavigate()



  function logout() {
    // const token_data = cookies.get('Token_access')

    // Axios.post( 
    //   'http://34.201.114.126:8000/AdminPanel/logout/',{
    //     headers: {
    //       'Authorization': `Bearer ${token_data}`
    //   }

    //   }
     
    // ).then((response)=>{
      dispatch({ type: 'Login', login: false })
      cookies.remove("Token_access")
      navigate("/login")
    // })



    
  }


  function close() {
    // document.getElementById("navbarSupportedContent").className="collapse('hide');
  }


  return (

    <>

      {
        islogin.state.login === true &&
        <nav
          id="navbarSupportedContent"
          className="collapse navbar-collapse d-lg-block sidebar  bg-white">
          <div className="container">
            <div className="row">
              <div className='col-6 center'>
                <a className="navbar-brand" href="/">
                  <img src="" alt="" width="30" height="24" className="d-inline-block align-text-top brand" />
                </a>
              </div>
              <div className='col-6 margin' style={{ fontsize: "initial" }}>
                <h3>Hello, Mr</h3>
                <h4>My Admin Panel</h4>
              </div>
              <div className='col-12 margin' style={{ fontsize: "initial" }}>
                <h5>NAVIGATIONS</h5>
              </div>
            </div>
          </div>
          <div className="position-sticky">
            <div className="list-group list-group-flush mx-3 mt-4">
              <Link
                to="/"
                className="list-group-item list-group-item-action py-2 ripple"
                aria-current="true"
              >
                <i className="fas fa-tachometer-alt fa-fw me-3"></i
                ><span>dashboard</span>
              </Link>
              <Link
                to="/category"
                className="list-group-item list-group-item-action py-2 ripple "
              >
                <i className="fa fa-list-alt fa-fw me-3"></i
                ><span>Category</span>
              </Link>
              <Link
                to="/SubCategory"
                className="list-group-item list-group-item-action py-2 ripple"
              ><i className="fa fa-list-alt fa-fw me-3"></i><span>Sub Category</span></Link
              >
              <Link
                to="/Countries"
                className="list-group-item list-group-item-action py-2 ripple"
              ><i className="fas fa-globe-asia  fa-fw me-3"></i
              ><span>Countries</span></Link>
              <Link
                to="/States"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <i className="fa-solid fa-city fa-fw me-3"></i><span>States</span>
              </Link>
              <Link
                to="/City"
                className="list-group-item list-group-item-action py-2 ripple"
              ><i className="fa-solid fa-city fa-fw me-3"></i><span>Cities</span></Link
              >

              <Link
                to="/Tax"
                className="list-group-item list-group-item-action py-2 ripple"
              ><i className="fas fa-users fa-fw me-3"></i><span>taxes</span></Link
              >
              <Link
                to="/Discount"
                className="list-group-item list-group-item-action py-2 ripple"
              ><i className="fas fa-money-bill fa-fw me-3"></i><span>Discount</span></Link
              >
              <Link
                to="/Netweight"
                className="list-group-item list-group-item-action py-2 ripple"
              ><i className="fas fa-money-bill fa-fw me-3"></i><span>Net Weight</span></Link
              >
              <Link
                to="/Flavour"
                className="list-group-item list-group-item-action py-2 ripple"
              ><i className="fas fa-money-bill fa-fw me-3"></i><span>Flavours</span></Link
              >


              <Link
                to="/Store"
                className="list-group-item list-group-item-action py-2 ripple"
              ><i className="fas fa-globe fa-fw me-3"></i
              ><span>Stores</span></Link
              >

              <Link
                to="/Brand"
                className="list-group-item list-group-item-action py-2 ripple"
              ><i className="fas fa-calendar fa-fw me-3"></i
              ><span>Brand</span></Link
              >

              <Link
                to="/Product"
                className="list-group-item list-group-item-action py-2 ripple"
              ><i className="fas fa-money-bill fa-fw me-3"></i><span>Product</span></Link
              >
              <Link
                to="/News"
                className="list-group-item list-group-item-action py-2 ripple"
              ><i className="fas fa-money-bill fa-fw me-3"></i><span>News</span></Link
              >
              <Link
                to="/Coupon"
                className="list-group-item list-group-item-action py-2 ripple"
              ><i className="fas fa-money-bill fa-fw me-3"></i><span>COUPON_TYPES</span></Link
              >
              {/* <a
                href="/"
                className="list-group-item list-group-item-action py-2 ripple"
              ><i className="fas fa-money-bill fa-fw me-3"></i><span>Claimed Coupon</span></a
              > */}
              <Link
                to="/GiftVoucher"
                className="list-group-item list-group-item-action py-2 ripple"
              ><i className="fas fa-money-bill fa-fw me-3"></i><span onClick={close}>Gift Voucher</span></Link
              >
              <a
                href="/"
                className="list-group-item list-group-item-action py-2 ripple"
              ><i className="fas fa-money-bill fa-fw me-3"></i><span>ClaimGiftVoucherr</span></a
              >





            </div>
          </div>
        </nav>
      }

      {
        islogin.state.login === true &&
        <nav
          id="main-navbar" className="navbar navbar-expand-lg navbar-light brand sticky-top">


          <div className="container-fluid " >
            <div className="col-12 Add_Category">
              <div className="col-2">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
              <div className="col-8">
                <div className="row search_left">
                  <div className="col con">
                    <div className="  search  ">
                      <Search></Search>
                    </div>
                    <div className="con messagebox">
                      <IoMdMailUnread></IoMdMailUnread>
                    </div>
                    <div className=" con messagebox">
                      <VscBellDot></VscBellDot>
                    </div>
                  </div>
                </div>
                <div className="col-2 position-absolute top-50 end-0 translate-middle-y">

                  {
                    islogin.state.login === true &&
                    <p className="louout" onClick={logout}>Logout</p>
                  }

                </div>
              </div>
              <div className="row search_left">



              </div>
            </div>
          </div>
        </nav>

      }





    </>

  );
}

export default Navbar;