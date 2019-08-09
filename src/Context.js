import React, { createContext, useState } from 'react'
export const MyContext = createContext()

const ContextProvider = props => {
  const [token, setToken] = useState('')
  const login = token => {
    setToken(token)
  }
  return(
    <MyContext.Provider value={{token, login}}>
        {props.children}
    </MyContext.Provider>
  )
}

export default ContextProvider