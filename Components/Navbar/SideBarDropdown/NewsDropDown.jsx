import * as  React from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";
import { IoNewspaperOutline } from "react-icons/io5"
import {RiArrowRightSLine} from 'react-icons/ri';
export default function NewsDropDown() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [Arrow, SetArrow] = React.useState("")

    function toggleAnswer1() {
        $('#News').slideToggle();
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
        $('#News').hide();
    }, [])





    return (
        <div onClick={toggleAnswer1} >

            <div className='col list-group-item list-group-item-action py-2 ripple '>
            <div className='side_bar_option '>
                  <span><IoNewspaperOutline></IoNewspaperOutline></span>
                  <span className='side_penal_link'>News</span>
                  <span className={Arrow}><RiArrowRightSLine></RiArrowRightSLine></span>
                </div>
            </div>
            <div className=" Category_box ">


                <div className=''>
                    <ul className='drop_down  ' id="News" >
                        <div className="line">
                        <Link to="/News"
                                className=''
                            > <li className='submenu '>
                                    <span className='link_Name'>News </span></li></Link>
                            <Link to="/NewsCategory"
                                className=''
                            > <li className='submenu '>
                                    <span className='link_Name'>Category </span></li></Link>
                            <Link to="/NewsSubCategory"
                                className=''
                            > <li className='submenu'><span className='link_Name'>Sub Category</span></li></Link>
                          
                        

                        </div>

                    </ul>
                </div>
            </div>

        </div>
    )
}