import * as  React from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";
import { FiSettings } from "react-icons/fi"
import {RiArrowRightSLine} from 'react-icons/ri';
export default function SettingDropDown() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [Arrow, SetArrow] = React.useState("")

    function toggleAnswer1() {
        $('#Setting').slideToggle();
        $('.dropdown').addClass("Togglebar_Arrow")
        if (Arrow === "") {
            SetArrow("Togglebar_Arrow")
            // $('#answer1').slideToggle();
        }
        else {
            SetArrow("")
        }
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
        // $('#answer1').slideToggle();
        $('#Setting').hide();
    }, [])





    return (
        <div onClick={toggleAnswer1} >

            <div className='col list-group-item list-group-item-action py-2 ripple '>
            <div className='side_bar_option '>
                  <span><FiSettings></FiSettings></span>
                  <span className='side_penal_link'>Setting</span>
                  <span className={Arrow}><RiArrowRightSLine></RiArrowRightSLine></span>
                </div>
            </div>
            <div className=" Category_box ">


                <div className=''>
                    <ul className='drop_down  ' id="Setting" >
                        <div className="line ">
                           
                            <Link to="/"
                                className=''
                            > <li className='submenu '>
                                    <span className='link_Name '>Message </span></li></Link>
                            <Link to="/"
                                className=''
                            > <li className='submenu'><span className='link_Name'>Term & Condition</span></li></Link>
                          
                        
                          <Link to="/"
                                className=''
                            > <li className='submenu'><span className='link_Name'>Settings</span></li></Link>
                        </div>

                    </ul>
                </div>
            </div>

        </div>
    )
}