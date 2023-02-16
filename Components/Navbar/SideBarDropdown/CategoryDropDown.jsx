import * as  React from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";
import { MdLineWeight } from "react-icons/md"
import {RiArrowRightSLine} from 'react-icons/ri';
export default function CategoryDropDown() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [Arrow, SetArrow] = React.useState("")

    function toggleAnswer1() {
        $('#Category').slideToggle();
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
        $('#Category').hide();
        // console.log($('#Category').hide())
    }, [])





    return (
        <div onClick={toggleAnswer1} >

            <div className='col list-group-item list-group-item-action py-2 ripple '>
            <div className='side_bar_option '>
                  <span><MdLineWeight></MdLineWeight></span>
                  <span className='side_penal_link'>Category</span>
                  <span className={Arrow}><RiArrowRightSLine></RiArrowRightSLine></span>
                </div>
            </div>
            <div className=" Category_box ">


                <div className=''>
                    <ul className='drop_down  ' id="Category" >
                        <div className="line">
                           
                            <Link to="/category"
                                className=''
                            > <li className='submenu '>
                                    <span className='link_Name'>Category </span></li></Link>
                            <Link to="/subCategory"
                                className=''
                            > <li className='submenu'><span className='link_Name'>Sub Category</span></li></Link>
                          
                        

                        </div>

                    </ul>
                </div>
            </div>

        </div>
    )
}