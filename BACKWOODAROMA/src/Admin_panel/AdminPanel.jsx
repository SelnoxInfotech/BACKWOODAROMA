import React from 'react'

import DonetChartTotalsale from './DonetChartTotalsale'
import RightPenalscore from './RightPenalscore'
import StatusBarCard from './StatusBarCard'
import TotalUserLineChart from './TotalUserLineChart'

export default function AdminPanel() {
  return (
    <div className='container-fluid'>
      <div className='row'>

        <div className='col-sm-2 border '>
          {/* <NavigationBar></NavigationBar> */}
        </div>
        <div className='col-sm-6 border top' >
          <StatusBarCard></StatusBarCard>
          <div className='row'>
            <div className='col-sm-6 top admin_col'>
              <TotalUserLineChart></TotalUserLineChart>
            </div>
            <div className='col-sm-6 top admin_col'>
              <DonetChartTotalsale></DonetChartTotalsale>
            </div>
          </div>
        </div>
        <div className='col-sm-4 border top'>
          <RightPenalscore></RightPenalscore>
        </div>
      </div>

    </div>
  )
}
