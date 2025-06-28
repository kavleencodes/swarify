
import { useEffect, useState } from 'react'
// import './App.css'
// import SwarifyLogo from './components/SwarifyLogo'
// import Options from './components/Options';
// import Login from './components/Login';

// function App() {

//   const [showMainContent,setShowMainContent]=useState(false)

//   useEffect(()=>{
//     const timer =setTimeout(()=>{
//       setShowMainContent(true);
//     },2500);
//     return ()=>clearTimeout(timer)
//   },[]);
  

//   return (
//     <>
//       {/* <SwarifyLogo/> */}

//       {!showMainContent ?(
//         <SwarifyLogo/>
//       ):(
//         <Login/>
//       )}
//     </>
//   )
// }

// export default App


import './App.css';
import SwarifyLogo from './components/SwarifyLogo';
import Options from './components/Options';
import Login from './components/Login';

function App() {
  const [currentScreen, setCurrentScreen] = useState('logo');

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('options');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Move to login when an option is clicked
  const handleOptionClick = () => {
    setCurrentScreen('login');
  };

  return (
    <>
      {currentScreen === 'logo' && <SwarifyLogo />}
      {currentScreen === 'options' && <Options onOptionClick={handleOptionClick} />}
      {currentScreen === 'login' && <Login />}
    </>
  );
}

export default App;

