
import { useEffect, useState } from 'react'
import './App.css'
import SwarifyLogo from './components/SwarifyLogo'
import Options from './components/Options';

function App() {

  const [showMainContent,setShowMainContent]=useState(false)

  useEffect(()=>{
    const timer =setTimeout(()=>{
      setShowMainContent(true);
    },2500);
    return ()=>clearTimeout(timer)
  },[]);
  

  return (
    <>
      {/* <SwarifyLogo/> */}

      {!showMainContent ?(
        <SwarifyLogo/>
      ):(
        <Options/>
      )}
    </>
  )
}

export default App
