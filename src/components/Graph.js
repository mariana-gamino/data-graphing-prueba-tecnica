import React, { useEffect, useContext } from 'react'
import { MyContext } from '../Context'
import axios from 'axios'

const Graph = props => {
  const { token, login } = useContext(MyContext)
  login(token)
  console.log(token)
  //Checar esto.
  if(!token) props.history.push('/')

  const getData = () => {
    
  }

  return (
    <div>
      <div className="inputs">
        <div className="container">
          <label>Period</label><br/>
          <input type="date" id="startDate"/>
          <input type="date" id="endDate"/>
        </div>
        <div className="container">
          <label>Start hour</label><br/>
          <input type="number" id="startHour"/>
        </div>
        <div className="container">
          <label>End hour</label><br/>
          <input type="number" id="endHour"/>
        </div>
        <div className="container">
          <label>Refresh</label><br/>
          <button onClick={getData}>Refresh</button>
        </div>
      </div>
    </div>
  )
}

export default Graph
