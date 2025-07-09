

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


import { useState, useEffect } from 'react';
import './App.css';
import SwarifyLogo from './components/SwarifyLogo';
import Options from './components/Options';
import Login from './components/Login';
import Signup from './components/Signup';
import ArtistSearch from './components/ArtistSearch';

function App() {
  const [screen, setScreen] = useState('logo');

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('options');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {screen === 'logo' && <SwarifyLogo />}
      {screen === 'options' && (
        <Options onOptionClick={() => setScreen('login')} />
      )}
      {screen === 'login' && (
        <Login onSignupClick={() => setScreen('signup')} />
      )}
      {screen === 'signup' && (
        <Signup onLoginClick={() => setScreen('login')} />
      )}


      {/* <ArtistSearch/> */}
    </>
  );
}

export default App;




