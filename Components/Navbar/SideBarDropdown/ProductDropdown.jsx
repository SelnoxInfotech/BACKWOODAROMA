import * as  React from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";
import { IoBagCheckSharp } from "react-icons/io5"
import { RiArrowRightSLine } from 'react-icons/ri';
export default function ProductDropDown() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [Arrow, SetArrow] = React.useState('')

    function toggleAnswer1() {
        $('#answer1').slideToggle();
        $('.dropdown').addClass("Togglebar_Arrow")
        if (Arrow === "") {
            SetArrow("Togglebar_Arrow")
            // $('#answer1').slideToggle();
        }
        else {
            SetArrow('')
        }
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
        // $('#answer1').slideToggle();
        $('#answer1').hide();
    }, [])





    return (
        <div onClick={toggleAnswer1} >

            <div className='col list-group-item list-group-item-action py-2 ripple '>
                <div className='side_bar_option '>
                    <span><IoBagCheckSharp></IoBagCheckSharp></span>
                    <span className='side_penal_link'>Product</span>
                    <span className={Arrow}><RiArrowRightSLine ></RiArrowRightSLine></span>
                </div>
            </div>
            <div className="box ">


                <div className=''>
                    <ul className='drop_down  ' id="answer1" >
                        <div className="line">

                            <Link to="/Product"
                                className=''
                            > <li className='submenu '>

                                    <span className='link_Name'>All Product </span></li></Link>
                            <Link to="/"
                                className=''
                            >  <li className='submenu'><span className='link_Name'>Top Selling Product</span></li></Link>
                            <Link to="/"
                                className=''
                            > <li className='submenu'><span className='link_Name'>Inventory</span></li></Link>
                            <Link to="/"
                                className=''
                            > <li className='submenu'><span className='link_Name'>Category</span></li></Link>

                        </div>

                    </ul>
                </div>
            </div>

        </div>
    )
}