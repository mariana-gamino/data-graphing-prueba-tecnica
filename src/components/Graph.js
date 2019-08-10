import React, { useEffect, useContext } from 'react'
import { MyContext } from '../Context'
import axios from 'axios'

const Graph = props => {
  const { token, login } = useContext(MyContext)
  login(token)
  console.log(token)
  //Checar esto.
  // if(!token) props.history.push('/')

  const getData = () => {
    
  }

  return (
    <div>
      <div className="inputs">
        <div className="container">
          <label>Period</label><br/>
          <input type="text" id="startDate" className="period" placeholder="YYYY-MM-DD"/>
          <input type="text" id="endDate" className="period" placeholder="YYYY-MM-DD"/>
        </div>
        <div className="container" style={{width: "10%"}}>
          <label>Start hour</label><br/>
          <input type="number" id="startHour" className="hour" placeholder="HH" min="0" max="24" />
        </div>
        <div className="container" style={{width: "10%"}}>
          <label>End hour</label><br/>
          <input type="number" id="endHour" className="hour" placeholder="HH" min="0" max="24"/>
        </div>
        <div className="container">
          <label>Refresh</label><br/>
          <button onClick={getData}>REFRESH</button>
        </div>
      </div>

      <div className="KPIs">
        <div className="kpiContainer">
            <i class="far fa-user-circle fa-2x" style={{color: "#53E0A1"}}></i>
            <div className="data">
            <label>Unique Visitors</label>
            </div>
        </div>
        <div className="kpiContainer">
          <i class="fas fa-check fa-2x" style={{color: "#53E0A1"}}></i>
          <div className="data">
          <label>Visits</label>
          </div>
        </div>
        <div className="kpiContainer">
          <i class="far fa-gem fa-2x" style={{color: "#3FBBDC"}}></i>
          <div className="data">
          <label>% Unique Visitors</label>
          </div>
        </div>
        <div className="kpiContainer">
          <i class="far fa-clock fa-2x" style={{color: "#6C747E"}}></i>
          <div className="data">
          <label>Avg Time</label>
          </div>
        </div>
        <div className="kpiContainer">
          <i class="far fa-smile-beam fa-2x" style={{color: "#6C747E"}}></i>
          <div className="data">
          <label>Unique Loyals</label>
          </div>
        </div>
        <div className="kpiContainer">
          <i class="fas fa-redo fa-2x" style={{color: "#31D3D3"}}></i>
          <div className="data">
          <label>% Loyalty Visitors</label>
          </div>
        </div>
        <div className="kpiContainer">
          <i class="fas fa-wave-square fa-2x" style={{color: "#31D3D3"}}></i>
          <div className="data">
          <label>Frequency Of Visit</label>
          </div>
        </div>
        <div className="kpiContainer">
          <i class="fas fa-shopping-cart fa-2x" style={{color: "#3FBBDC"}}></i>
          <div className="data">
          <label>Unique Passengers</label>
          </div>
        </div>
      </div>
      <canvas>
      </canvas>
    </div>
  )
}

export default Graph
