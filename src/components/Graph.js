import React, { useState } from 'react'
import axios from 'axios'
import useForm from '../hooks/useForm'
import { Bar } from 'react-chartjs-2';
import Cookies from 'js-cookie'
import swal from 'sweetalert'
const baseURL = 'https://voldemort.klustera.com'

const Graph = props => {
  const token = Cookies.get('cookie')
  if(!token) props.history.push('/')
  const options = {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 10
      }
    }
  }
  const [form, handleInputs] = useForm()
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Visits',
        backgroundColor: '#00EE22',
        borderColor: 'none',
        borderWidth: 0,
        hoverBorderColor: 'none',
        data: [0,100]
      },
      {
        label: 'Passersby',
        backgroundColor: '#2C8DFF',
        borderColor: 'none',
        borderWidth: 0,
        hoverBorderColor: 'none',
        data: [0,100]
      }
    ]
  })
  const uniqueVisitors = document.getElementById('uniqueVisitors')
  const numVisits = document.getElementById('visits')
  const reachRate = document.getElementById('reachRate')
  const avgStay = document.getElementById('avgStay')
  const uniqueLoyals = document.getElementById('uniqueLoyals')
  const loyaltyVisitors = document.getElementById('loyaltyVisitors')
  const frequencyOfVisit = document.getElementById('frequencyOfVisit')
  const uniquePassengers = document.getElementById('uniquePassengers')
  const loading = document.getElementById('loading')

  const inputValidations = (startDate, endDate, startHour, endHour) => {
    if(endDate < startDate){
      swal({
        title: "Warning",
        text: "The end date can't be before the start date.",
        icon: "warning",
        dangerMode: true,
        timer: 3000,
        button: false
        })
        return false
    } else if(endDate === startDate){
        if(endHour < startHour){
          swal({
            title: "Warning",
            text: "The end hour can't be before the start hour when you select the same day.",
            icon: "warning",
            dangerMode: true,
            timer: 3000,
            button: false
            })
            return false
        }else return true
    } else return true
  }

  const getData = () => {
    if(!token) props.history.push('/')
    const { startDate, endDate, startHour, endHour } = form
    if(!startDate || !endDate || !startHour || !endHour){
      swal({
        title: "Warning",
        text: "Please fill in all the fields.",
        icon: "warning",
        dangerMode: true,
        timer: 3000,
        button: false
        })
    } else if(inputValidations(startDate, endDate, startHour, endHour)) {
      loading.innerHTML = '<img src="/loading.gif" width="50px"/>'
      axios.get(`${baseURL}/get_kpis/1159/${startDate.toString()}/${endDate.toString()}/${startHour.toString().padStart(2,"0")}/${endHour.toString().padStart(2,"0")}`, {
      headers: {
        "x-access-token": token,
        "Content-type": "application/json"
      }})
      .then(response => {
        loading.innerHTML = ''
        const { uniques, visits, reach_rate, avg_stay, loyals, loyalty, frequency, passersby } = response.data.kpis
        uniqueVisitors.innerHTML = uniques
        numVisits.innerHTML = visits
        reachRate.innerHTML = `${parseFloat(reach_rate).toFixed(2)}%`
        avgStay.innerHTML = avg_stay
        uniqueLoyals.innerHTML = loyals
        loyaltyVisitors.innerHTML = `${parseFloat(loyalty).toFixed(2)}%`
        frequencyOfVisit.innerHTML = frequency
        uniquePassengers.innerHTML = passersby
      })
      .catch(err => {
        console.log(err)
      })
      axios.get(`${baseURL}/fetch_daily_footprint/1159/${startDate.toString()}/${endDate.toString()}/${startHour}/${endHour}`, {
        headers: {
          "x-access-token": token,
          "Content-type": "application/json"
        }})
      .then(response => {
        let dates = response.data.results.visitors_daily.map(e => {return e[0]})
        let visits = response.data.results.visitors_daily.map(e => {return e[1]})
        let passers = response.data.results.visitors_daily.map(e => {return e[2]})
        setData(prevState => ({
          ...prevState,
          labels: [...dates],
          datasets: [
            {
              label: 'Visits',
              backgroundColor: '#00EE22',
              borderColor: 'none',
              borderWidth: 0,
              hoverBorderColor: 'none',
              data: [...visits]
            },
            {
              label: 'Passersby',
              backgroundColor: '#2C8DFF',
              borderColor: 'none',
              borderWidth: 0,
              hoverBorderColor: 'none',
              data: [...passers]
            }
          ]
        }))
      })
    }
  }

  return (
    <div>
      <div className="inputs">
        <div className="container">
          <label>Period</label><br/>
          <input type="date" name="startDate" className="period" placeholder="YYYY-MM-DD" onChange={handleInputs}/>
          <input type="date" name="endDate" className="period" placeholder="YYYY-MM-DD" onChange={handleInputs}/>
        </div>
        <div className="container" style={{width: "10%"}}>
          <label>Start hour</label><br/>
          <input type="number" name="startHour" className="hour" placeholder="HH" min="0" max="24" onChange={handleInputs}/>
        </div>
        <div className="container" style={{width: "10%"}}>
          <label>End hour</label><br/>
          <input type="number" name="endHour" className="hour" placeholder="HH" min="0" max="24" onChange={handleInputs}/>
        </div>
        <div className="container">
          <label>Refresh</label><br/>
          <button onClick={getData}>REFRESH</button>
        </div>
        <div className="loading" id="loading"></div>
      </div>

      <div className="KPIs">
        <div className="kpiContainer">
            <i className="far fa-user-circle fa-2x" style={{color: "#53E0A1"}}></i>
            <div className="data">
            <label>Unique Visitors</label>
            <p id="uniqueVisitors"></p>
            </div>
        </div>
        <div className="kpiContainer">
          <i className="fas fa-check fa-2x" style={{color: "#53E0A1"}}></i>
          <div className="data">
          <label>Visits</label>
          <p id="visits"></p>
          </div>
        </div>
        <div className="kpiContainer">
          <i className="far fa-gem fa-2x" style={{color: "#3FBBDC"}}></i>
          <div className="data">
          <label>% Unique Visitors</label>
          <p id="reachRate"></p>
          </div>
        </div>
        <div className="kpiContainer">
          <i className="far fa-clock fa-2x" style={{color: "#6C747E"}}></i>
          <div className="data">
          <label>Avg Time</label>
          <p id="avgStay"></p>
          </div>
        </div>
        <div className="kpiContainer">
          <i className="far fa-smile-beam fa-2x" style={{color: "#6C747E"}}></i>
          <div className="data">
          <label>Unique Loyals</label>
          <p id="uniqueLoyals"></p>
          </div>
        </div>
        <div className="kpiContainer">
          <i className="fas fa-redo fa-2x" style={{color: "#31D3D3"}}></i>
          <div className="data">
          <label>% Loyalty Visitors</label>
          <p id="loyaltyVisitors"></p>
          </div>
        </div>
        <div className="kpiContainer">
          <i className="fas fa-wave-square fa-2x" style={{color: "#31D3D3"}}></i>
          <div className="data">
          <label>Frequency Of Visit</label>
          <p id="frequencyOfVisit"></p>
          </div>
        </div>
        <div className="kpiContainer">
          <i className="fas fa-shopping-cart fa-2x" style={{color: "#3FBBDC"}}></i>
          <div className="data">
          <label>Unique Passengers</label>
          <p id="uniquePassengers"></p>
          </div>
        </div>
      </div>
      <div className="chart">
        <h2>Foot Traffic</h2>
        <Bar data={data} height={75} options={options}/>
      </div>
    </div>
  )
}

export default Graph
