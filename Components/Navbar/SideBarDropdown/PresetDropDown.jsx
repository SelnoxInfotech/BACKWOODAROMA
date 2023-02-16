import * as  React from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";
import { GrSpa } from "react-icons/gr"
import {RiArrowRightSLine} from 'react-icons/ri';
export default function PresetDropDown() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [Arrow, SetArrow] = React.useState("")

    function toggleAnswer1() {
        $('#Preset').slideToggle();
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
        $('#Preset').hide();
    }, [])





    return (
        <div onClick={toggleAnswer1} >

            <div className='col list-group-item list-group-item-action py-2 ripple '>
            <div className='side_bar_option '>
                  <span><GrSpa></GrSpa></span>
                  <span className='side_penal_link'>Preset</span>
                  <span className={Arrow}><RiArrowRightSLine></RiArrowRightSLine></span>
                </div>
            </div>
            <div className=" Category_box ">


                <div className=''>
                    <ul className='drop_down  ' id="Preset" >
                        <div className="line">
                           
                            <Link to="/Flavour"
                                className=''
                            > <li className='submenu '>
                                    <span className='link_Name'>Flavour </span></li></Link>
                            <Link to="/Netweight"
                                className=''
                            > <li className='submenu'><span className='link_Name'>Net Weight</span></li></Link>
                          
                        

                        </div>

                    </ul>
                </div>
            </div>

        </div>
    )
}