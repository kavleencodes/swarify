// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Options from './components/Options.jsx';
// import Login from './components/Login.jsx';
// import Dashboard from './components/dashboard.jsx';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Options />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Options from './components/Options.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Dashboard from './components/dashboard.jsx';
import Search from './components/Search.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Options />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        

      </Routes>
    </Router>
    
  );
}

export default App;

