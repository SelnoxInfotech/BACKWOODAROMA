import React from 'react'
import { TfiGallery } from 'react-icons/tfi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { BsBagCheck } from 'react-icons/bs'
import { FaRegListAlt } from "react-icons/fa"
import { CChart } from "@coreui/react-chartjs"
import StoreRadialbars from './StoreRadialbars';
export default function RightPenalscore() {
    return (
        <div className='container-fluid '>
            <div className='row'>
                <div className='col  standard'>
                    <TfiGallery></TfiGallery>
                    <span>Mr.Jack</span>
                    <p>standard Member</p>
                </div>
                <div className='col center'>
                    <button className="btn btn_color"> <h5>Upgrade to Pro </h5></button>
                </div>
            </div>
            <div className='row standard top '>
                <div className='col-12 Store'>
                    <div className='col-6'>
                        <h5>Store Overview</h5>
                    </div>

                    <div className='col-6  up'>
                        <span >...</span>
                    </div>

                </div>
            </div>
            <div className='row top center border standard '>
                <div className='col-4 top topcen '>
                    <h6>Total Products</h6>
                    <BsBagCheck className='color'></BsBagCheck>
                    <span className='card_persent_font'>1,526</span>
                    <div className='col con'>
                        <p>20</p> &nbsp;<span>New products!</span>
                    </div>
                </div>
                <div className='col-8 color d-flex justify-content-center'>
                    <CChart style={{ width: "100%" }}
                        type="bar"
                        data={{
                            labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July'],
                            datasets: [
                                {

                                    label: ' Total Products Score',
                                    backgroundColor: '#31B665',
                                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                                },
                            ],
                        }}
                        labels="months"
                    />

                </div>

            </div>
            <div className='row top center border standard  '>
                <div className='col-4 top topcen '>
                    <h6>Total followers</h6>
                    <AiOutlineUserAdd className='color'></AiOutlineUserAdd>
                    <span className='card_persent_font'>240,000</span>
                    <div className='col con'>
                        <p>243</p>&nbsp; <span> New followers!</span>
                    </div>
                </div>
                <div className='col-8 color d-flex justify-content-center'>
                    <CChart style={{ width: "100%" }}
                        type="bar"
                        data={{
                            labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July'],
                            datasets: [
                                {

                                    label: 'Total followers Score',
                                    backgroundColor: '#31B665',
                                    data: [10, 40, 12, 80, 10, 20, 45, 50, 40],
                                },
                            ],
                        }}
                        labels="months"
                    />

                </div>

            </div>
            <div className='row standard top '>
                <div className='col-12 Store'>
                    <div className='col-6'>
                        <h5>Store</h5>
                    </div>

                    <div className='col-6  up'>
                        <span >...</span>
                    </div>

                </div>
                <div className='row top center border standard  '>
                    <div className='col-6  '>
                        <p>Store total score</p>
                        <FaRegListAlt className='color'></FaRegListAlt>
                        <span>92 / 100</span>
                    </div>
                    <div className='col-12 '>
                        <StoreRadialbars></StoreRadialbars>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
