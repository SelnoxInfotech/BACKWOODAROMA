import * as  React from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";
import { GrLocation } from 'react-icons/gr';
import { RiArrowRightSLine } from 'react-icons/ri';

export default function LocationDropDown() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [Arrow, SetArrow] = React.useState("")

    function toggleAnswer1() {
        $('#Location').slideToggle();
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
        $('#Location').hide();
    }, [])





    return (
        <div onClick={toggleAnswer1} >

            <div className='col list-group-item list-group-item-action py-2 ripple '>
            <div className='side_bar_option '>
                  <span><GrLocation></GrLocation></span>
                  <span className='side_penal_link'>Location</span>
                  <span className={Arrow}><RiArrowRightSLine ></RiArrowRightSLine></span>
                </div>
            </div>
            <div className=" Category_box ">


                <div className=''>
                    <ul className='drop_down  ' id="Location" >
                        <div className="line">
                           
                            <Link to="/Countries"
                                className=''
                            > <li className='submenu '>
                                    <span className='link_Name'>Country </span></li></Link>
                            <Link to="/States"
                                className=''
                            > <li className='submenu'><span className='link_Name'>State</span></li></Link>
                            <Link to="/City"
                                className=''
                            > <li className='submenu'><span className='link_Name'>City</span></li></Link>
                          
                        

                        </div>

                    </ul>
                </div>
            </div>

        </div>
    )
}