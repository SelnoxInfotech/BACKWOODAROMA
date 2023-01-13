import React from 'react'
import { RiCheckboxBlankFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
export default function NavigationBar() {
    return (
        <div className='container  background'>
            <div className='row'>
                <div className='col-6 center'>
                    <a className="navbar-brand" href="/">
                        <img src="" alt="" width="30" height="24" className="d-inline-block align-text-top brand" />
                    </a>
                </div>
                <div className='col-6 margin' style={{ fontsize:"initial"}}>
                    <h3>Hello, Mr</h3>
                    <h4>My Admin Panel</h4>
                </div>
                <div className='col-12 margin' style={{ fontsize:"initial"}}>
                    <h5>NAVIGATIONS</h5>
                </div>
                <div className='col-12   center '>
                    <ul >
                        <div className='row'>
                            <div className='col-2'>
                                <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                            </div>
                            <div className='col-10'>
                                <li className='margin '>Dashboard</li>
                            </div>
                        </div>




                        <hr></hr>
                        <div className='row'>
                            <div className='col-2'>
                                <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                            </div>
                            <div className='col-10'>
                                <Link to="/category"><li className='margin '>Category</li></Link>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row'>
                            <div className='col-2'>
                                <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                            </div>
                            <div className='col-10'>
                                <Link to="/subCategory"><li className='margin '>SubCategory</li></Link>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row'>
                            <div className='col-2'>
                                <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                            </div>
                            <div className='col-10'>
                                <li className='margin '>Countries</li>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row'>
                            <div className='col-2'>
                                <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                            </div>
                            <div className='col-10'>
                                <li className='margin '>States</li>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row'>
                            <div className='col-2'>
                                <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                            </div>
                            <div className='col-10'>
                                <li className='margin '>Dashboard</li>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row'>
                            <div className='col-2'>
                                <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                            </div>
                            <div className='col-10'>
                                <li className='margin '>Cities</li>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row'>
                            <div className='col-2'>
                                <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                            </div>
                            <div className='col-10'>
                                <li className='margin '>Stores</li>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row'>
                            <div className='col-2'>
                                <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                            </div>
                            <div className='col-10'>
                                <li className='margin '>Choice</li>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row'>
                            <div className='col-2'>
                                <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                            </div>
                            <div className='col-10'>
                                <li className='margin '>Brand</li>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row'>
                            <div className='col-2'>
                                <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                            </div>
                            <div className='col-10'>
                                <li className='margin '>taxes</li>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row'>
                            <div className='col-2'>
                                <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                            </div>
                            <div className='col-10'>
                                <li className='margin '>Discount</li>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row'>
                            <div className='col-2'>
                                <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                            </div>
                            <div className='col-10'>
                                <li className='margin '>Net_Weight</li>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row'>
                            <div className='col-2'>
                                <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                            </div>
                            <div className='col-10'>
                                <li className='margin '>Flavours</li>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row'>
                            <div className='col-2'>
                                <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                            </div>
                            <div className='col-10'>
                                <li className='margin '>LabResult</li>
                            </div>
                        </div>
                        <hr></hr>
                        <div>

                            <div className='row'>
                                <div className='col-2'>
                                    <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                                </div>
                                <div className='col-10'>
                                    <li className='margin '>Product</li>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='row'>
                                <div className='col-2'>
                                    <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                                </div>
                                <div className='col-10'>
                                    <li className='margin '>News</li>
                                </div>
                            </div>
                            <hr></hr>
                            <div className='row'>
                                <div className='col-2'>
                                    <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                                </div>
                                <div className='col-10'>
                                    <li className='margin '>COUPON_TYPES</li>
                                </div>
                            </div>
                            <hr></hr>
                            <div className='row'>
                                <div className='col-2'>
                                    <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                                </div>
                                <div className='col-10'>
                                    <li className='margin '>Claimed Coupon</li>
                                </div>
                            </div>
                            <hr></hr>
                            <div className='row'>
                                <div className='col-2'>
                                    <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                                </div>
                                <div className='col-10'>
                                    <li className='margin '>ClaimGiftVoucher</li>
                                </div>
                            </div>
                            <hr></hr>
                            <div className='row'>
                                <div className='col-2'>
                                    <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                                </div>
                                <div className='col-10'>
                                    <li className='margin '>ExportFile</li>
                                </div>
                            </div>
                            <hr></hr>
                            <div className='row'>
                                <div className='col-2'>
                                    <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                                </div>
                                <div className='col-10'>
                                    <li className='margin '>Filter</li>
                                </div>
                            </div>
                            <hr></hr>
                            <div className='row'>
                                <div className='col-2'>
                                    <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                                </div>
                                <div className='col-10'>
                                    <li className='margin '>Multiple Image Upload</li>
                                </div>
                            </div>
                            <hr></hr>
                            <div className='row'>
                                <div className='col-2'>
                                    <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                                </div>
                                <div className='col-10'>
                                    <li className='margin '>Replicate_data</li>
                                </div>
                            </div>
                            <hr></hr>
                            <div className='row'>
                                <div className='col-2'>
                                    <li className='margin '><RiCheckboxBlankFill></RiCheckboxBlankFill></li>
                                </div>
                                <div className='col-10'>
                                    <li className='margin '>SMTP</li>
                                </div>
                            </div>
                            <hr></hr>
                           


                    </ul>
                </div>
            </div>

        </div>
    )
}
