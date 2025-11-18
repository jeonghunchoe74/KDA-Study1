import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as C from './Comp'

function App() {
  let myName = "김주휘"

  return (
    <>
      <C.Welcome />
      <C.Welcome1 myName={myName}/>
      <C.Element />
      <C.LoggedIn />
      <C.List_Fruits />
      <C.Counter />
    </>
  )
}

export default App
