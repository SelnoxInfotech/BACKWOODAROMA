import React, { useContext } from 'react';

import Search from "./Search";
import { RiDashboardFill } from "react-icons/ri"
import { IoMdMailUnread } from 'react-icons/io';
import { IoStorefrontOutline } from "react-icons/io5"
import { MdOutlineAddShoppingCart } from "react-icons/md"
import {RiDragMoveFill} from "react-icons/ri"
import {HiOutlineReceiptTax} from "react-icons/hi"
import { VscBellDot } from 'react-icons/vsc';
import Cookies from 'universal-cookie';
import { Link, useNavigate } from "react-router-dom";
import Createcontext from "../../Hooks/Context/Context"
import ProductDropDown from './SideBarDropdown/ProductDropdown';
import CategoryDropDown from "./SideBarDropdown/CategoryDropDown"
import LocationDropDown from "./SideBarDropdown/LocationDropDown"
import PresetDropDown from "./SideBarDropdown/PresetDropDown"
import SpecialOfferDropDown from "./SideBarDropdown/SpecialOfferDropDowm"
import NewsDropDown from './SideBarDropdown/NewsDropDown'
import SettingDropDown from "./SideBarDropdown/SettingDropDown"
function Navbar() {
  const [windowSize, setWindowSize] = React.useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const { dispatch } = useContext(Createcontext)
  const islogin = useContext(Createcontext)
  const cookies = new Cookies();
  const navigate = useNavigate()


  function logout() {

    dispatch({ type: 'Login', login: false })
    cookies.remove("Token_access")
    navigate("/login")
    // })




  }
  React.useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });



  function close() {
    // document.getElementById("navbarSupportedContent").className="collapse('hide');
  }
  //jquery for toggle sub menus
  var dropdown = document.getElementsByClassName("dropdown-btn");
  var i;

  for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }
    });
  }
  return (

    <>

      {
        islogin.state.login === true &&
        <nav
          id="navbarSupportedContent"
          className="collapse navbar-collapse d-lg-block sidebar nav-side-menu ">
          <div className="container Side_Bar">
            <div className="row">
              {windowSize[0] <= 991 &&
                <div>

                  <div className='col-6 center'>
                    <a className="navbar-brand" href="/">
                      <img src="" alt="" width="30" height="24" className="d-inline-block align-text-top brand" />
                    </a>
                  </div>
                  <div className='col-6 margin' style={{ fontsize: "initial" }}>
                    <h3>Hello, Mr</h3>
                    <h4>My Admin Panel</h4>
                  </div>
                </div>
              }
              <div className='col-12 margin center' style={{ fontsize: "initial" }}>
                <h5>NAVIGATIONS</h5>
              </div>
            </div>

          </div>
          <div className='list-group list-group-flush mx-3 mt-4 ' style={{ fontsize: "initial" }}>
            <Link to="/" className="list-group-item list-group-item-action py-2 ripple" aria-current="true">
              <span className='color DashBorad_logo' ><RiDashboardFill></RiDashboardFill> </span>
              <span className='side_penal_link center' >Dashboard</span> </Link>
          </div>
          <div className="position-sticky">
            <div className="list-group list-group-flush mx-3 mt-4">
              <Link to="/Store" className="list-group-item list-group-item-action py-2 ripple ">
                <div className='side_bar_option'>
                  <span><IoStorefrontOutline></IoStorefrontOutline></span>
                  <span className='side_penal_link'>Store</span>
                </div>
              </Link>
              <ProductDropDown></ProductDropDown>
              <Link to="/" className="list-group-item list-group-item-action py-2 ripple">
                <div className='side_bar_option'>
                  <span><MdOutlineAddShoppingCart></MdOutlineAddShoppingCart></span>
                  <span className='side_penal_link'>Order</span>
                </div>

              </Link>
              <CategoryDropDown></CategoryDropDown>
              <LocationDropDown></LocationDropDown>
              <PresetDropDown></PresetDropDown>
             
              <Link to="/Brand" className="list-group-item list-group-item-action py-2 ripple">
                <div className='side_bar_option'>
                  <span><RiDragMoveFill></RiDragMoveFill></span>
                  <span className='side_penal_link'>Brand</span>
                </div>

              </Link>
              <Link to="/Tax" className="list-group-item list-group-item-action py-2 ripple">
                <div className='side_bar_option'>
                  <span><HiOutlineReceiptTax></HiOutlineReceiptTax></span>
                  <span className='side_penal_link'>Tax</span>
                </div>

              </Link>
               <SpecialOfferDropDown></SpecialOfferDropDown>
               <NewsDropDown></NewsDropDown>
               <SettingDropDown></SettingDropDown>
           

              
              
            

            </div>
          </div>
        </nav>
      }

      {
        islogin.state.login === true &&
        <nav
          id="main-navbar" className="navbar navbar-expand-lg navbar-light brand sticky-top">


          <div className="container-fluid " >

            <div className="col-12   Add_Category">
              <div className="col-2 ">

                {
                  windowSize[0] <= 991
                    ?
                    <div className='search_left'>
                      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                      </button>
                    </div>
                    :
                    <div className='display'>

                      <div className='col-6 center Brnd_logo '>
                        <a className="navbar-brand" href="/">
                          <img src="./image/blank_Image.webp" alt="" className="d-inline-block align-text-top brand UserImage" />
                        </a>
                      </div>
                      <div className='col-6 user_name ' >
                        <p>Hello, Mr</p>
                        <p className="user_name_my">My Admin Panel</p>
                      </div>
                    </div>
                }
              </div>

              <div className="col-8">
                <div className=" search_left  ">

                  <div className="col-6  search  ">
                    <Search></Search>
                  </div>
                  <div className="col-2 con  messagebox">
                    <IoMdMailUnread></IoMdMailUnread>
                  </div>
                  <div className="col-2 con align-middle  messagebox">
                    <VscBellDot></VscBellDot>
                  </div>

                </div>

              </div>
              <div className="col-2 con search_left">

                {
                  islogin.state.login === true &&
                  <p className="louout" onClick={logout}>Logout</p>
                }

              </div>
            </div>
          </div>
        </nav>

      }





    </>

  );
}

export default Navbar;