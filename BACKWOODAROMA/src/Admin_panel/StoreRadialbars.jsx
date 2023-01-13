import React, { Component } from "react";
import Chart from "react-apexcharts";

class RadialBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ["Fast response chat", "Packaging Quality", "Delivery speed"],
        legend: {
          show: true,
          width: "100%",
      height: "100%",
          size: "50%",
          fontSize: "10px",
          onItemClick: {
            toggleDataSeries: true
          },
          onItemHover: {
            highlightDataSeries: true
          },
          markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
            strokeColor: '#fff',
            fillColors: undefined,
            radius: 12,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0
        },
        },
        plotOptions: {
          radialBar: {
            // size: "2px",
            inverseOrder: false,
            startAngle: 0,
            // endAngle: 275,
            offsetX: 0,
            offsetY: 0,
            hollow: {
              margin: 5,
              size: "50%",
              background: "transparent",
              image: undefined,
              imageWidth: 100,
              imageHeight: 100,
              imageOffsetX: 0,
              imageOffsetY: 0,
              imageClipped: true,
              position: "front",
              dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 3,
                opacity: 0.5
              }
            },
            track: {
              show: false,
              startAngle: undefined,
              endAngle: undefined,
              background: "#f2f2f2",
              strokeWidth: "10%",
              opacity: 1,
              margin: 2,
              dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 0,
                opacity: 0.5
              }
            },
            dataLabels: {
              show: true,
              name: {
                show: true,
                fontSize: "22px",
                fontFamily: undefined,
                color: undefined,
                offsetY: -10
              },
              value: {
                show: true,
                fontSize: "10px",
                fontFamily: undefined,
                color: undefined,
                offsetY: 16,
                formatter: function (val) {
                  return val + "%";
                }
              },
              total: {
                show: true,
                fontSize: "10px",
                label: "Total",
                color: "#31B665",
                formatter: function (w) {
                  return (
                    w.globals.seriesTotals.reduce((a, b) => {
                      
                      return a + b;
                    }, 0)/
                  w.globals.series.length + 
                    "%"
                  );
                }
              }
            }
          }
        }
      },

      series: [20, 60, 90]
    };
  }

  render() {
    return (
      <div className="donut">
     <div className="row">
      <div className="col-12">
      <Chart
          options={this.state.options}
          series={this.state.series}
          type="radialBar"
          width="100%"
          height="200 "
        />

      </div>

     </div>
      </div>
    );
  }
}

export default RadialBar;
