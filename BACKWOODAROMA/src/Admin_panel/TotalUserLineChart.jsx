import React from 'react';
import Chart from "react-apexcharts";


class TotalUserLineChart extends React.Component {

   

    constructor(props) {
        super(props);

        this.state = {

            series: [
                {
                    name: "New - 2022",
                    data: [10, 20, 50, 66, 80, 90, 0]
                },
                {
                    name: "Register - 2022",
                    data: [10, 100, 14, 18, 80, 13, 13]
                }
            ],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    dropShadow: {
                        height: "3px",
                        enabled: true,
                        color: '#000',
                        top: 18,
                        left: 7,
                        blur: 10,
                        opacity: 0.2
                    },
                    toolbar: {
                        show: false
                    }
                },
                colors: ['#31B665', '#6BDCFF'],
                dataLabels: {
                    enabled: true,
                    background: {

                        enabled: true,
                        foreColor: 'transparent',
                        padding: 0,
                        width : "1px",
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: 'transparent',
                        opacity: 0.9,
                        dropShadow: {
                            enabled: true,
                            top: 0,
                            left: 1,
                            blur: 0,

                            opacity: 0.1
                        },
                       

                    }
                },
                stroke: {
                    show: true,
                    lineCap: 'butt',
                    width: 2,
                    curve: 'smooth'
                },
                title: {
                    text: 'Total User',
                    align: 'left',
                    style: {
                        fontSize:  '14px',
                        fontWeight:  'bold',
                        
                        color:  '#31B665'
                      },
                },
                grid: {
                    borderColor: '#e7e7e7',
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                markers: {
                    size: [4, 7],
                    colors: undefined,
                    strokeColors: '#fff',
                    strokeWidth: 2,
                    strokeOpacity: 0.9,
                    strokeDashArray: 0,
                    fillOpacity: 1,
                    discrete: [],
                    shape: "square",
                    radius: 2,
                    offsetX: 0,
                    offsetY: 0,
                    onClick: undefined,
                    onDblClick: undefined,
                    showNullDataPoints: true,
                    hover: {
                      size: undefined,
                      sizeOffset: 3
                    },
                   
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    title: {
                        text: 'Month'
                    }
                },
                // yaxis: {
                //     title: {
                //         text: 'Temperature'
                //     },
                //     min: 5,
                //     max: 40
                // },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -25,
                    offsetX: -5
                }
            },


        };
    }



    render() {
        return (


            <div id="chart">
                <Chart options={this.state.options} series={this.state.series} type="line" height={350} />
            </div>
        )
    }
}
export default TotalUserLineChart;