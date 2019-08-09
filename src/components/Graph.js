import React, { useEffect } from 'react'
import axios from 'axios'

const Graph = () => {

  useEffect(() => {
    const from = document.getElementById('from')
    const to = document.getElementById('to')
    const error = document.getElementById('err')

    from.addEventListener('input', () => {
      if (to.value > from.value) {
        error.innerHTML = ''
      } 
      else error.innerHTML = "The end date can't be before start date."
    })
  
    to.addEventListener('input', () => {
      if (to.value > from.value) {
        error.innerHTML = ''
      } 
      else error.innerHTML = "The end date can't be before start date."
    })

  }, [])

  return (
    <div>
      <div className="inputs">
        <label htmlFor="period">Period</label>
        <input type="date" id="from"/>
        <input type="date" id="to"/>
        <p style={{color: "red"}} id="err"></p>
      </div>
    </div>
  )
}

export default Graph
