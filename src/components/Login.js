import React, { useContext } from 'react'
import axios from 'axios'
import useForm from '../hooks/useForm'
import swal from 'sweetalert'
import { MyContext } from '../Context'
const baseURL = 'https://voldemort.klustera.com'


const Login = props => {
  const [form, handleInputs] = useForm()
  const { username, password } = form
  const { login } = useContext(MyContext)

  const handleLogin = () => {
    let config = {auth: {
      username: username,
      password: password
    }}

    axios.get(`${baseURL}/login`, config)
    .then(response => {
        const {token} = response.data
        login(token)
        props.history.push('/graph')
    })
    .catch(err => {
        console.log(err)
        swal({
          title: "Oops...",
          text: "Something went wrong.",
          icon: "error",
          dangerMode: true,
          timer: 3000,
          button: false
          })
    })
  }
  
  return(
    <div>
        <h2>Login</h2>
        <input type="text" name="username" placeholder="Username" onChange={handleInputs} required/> <br/>
        <input type="password" name="password" placeholder="Password" onChange={handleInputs} required/> <br/>
        <button onClick={handleLogin}>Login</button> <br/>
    </div>
  )
}

export default Login

