
import React from "react";
import Chart from "react-apexcharts";
function DonetChartTotalsale () {

    const state = {
    
      series: [44, 55, 41,  25],
      options: {
        labels: ["Aug", "Sep", "Oct" , "Nov"],
        chart: {
          width: "100%",
          type: 'donut',
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270
          }
        },
        dataLabels: {
          enabled: true,
           style: {
            fontSize:  '14px',
            fontWeight:  'bold',
            
            color:  'black'
          },
        },
        fill: {
          type: 'gradient',
        },
        legend: {
          position: 'left',
          formatter: function(val, opts) {
            return val + " - " + opts.w.globals.series[opts.seriesIndex]
          }
        },
        title: {
          text: 'Total Sale',
          style: {
            fontSize:  '14px',
            fontWeight:  'bold',
            
            color:  '#31B665'
          },
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    
    
    };
  



 
    return (
      

<div id="chart" className="center">
<Chart options={state.options} series={state.series} type="donut" width="100%" height="200" />
</div>
    )}


export default  DonetChartTotalsale 