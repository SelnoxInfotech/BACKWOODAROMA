import * as  React from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";
import { TfiGift } from "react-icons/tfi"
import {RiArrowRightSLine} from 'react-icons/ri';
export default function SpecialDropDown() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [Arrow, SetArrow] = React.useState('')

    function SpecialOfferDropDown() {
        $('#Special').slideToggle();
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
        $('#Special').hide();
    }, [])





    return (
        <div onClick={SpecialOfferDropDown} >

            <div className='col list-group-item list-group-item-action py-2 ripple '>
            <div className='side_bar_option '>
                  <span><TfiGift></TfiGift></span>
                  <span className='side_penal_link'>Special Offer</span>
                 <span className={Arrow}><RiArrowRightSLine ></RiArrowRightSLine></span>
                </div>
            </div>
            <div className="box ">


                <div className=''>
                    <ul className='drop_down  ' id="Special" >
                        <div className="line">
                           
                            <Link to="/GiftVoucher"
                                className=''
                            > <li className='submenu '>
                              
                                    <span className='link_Name'>Gift Voucher</span></li></Link>
                            
                            <Link to="/Coupon"
                                className=''
                            > <li className='submenu'><span className='link_Name'>Coupon Type</span></li></Link>
                            <Link to="/Discount"
                                className=''
                            > <li className='submenu'><span className='link_Name'>Discount</span></li></Link>

                        </div>

                    </ul>
                </div>
            </div>

        </div>
    )
}