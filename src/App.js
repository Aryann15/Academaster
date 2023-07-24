import './App.css';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import Signup from './Signup';
import Signin from './Signin';
import Navbar from './Navbar';
function App() {
  return (
    <>
    <div style={{width:'100vw',
  height:'100vh',
  backgroundColor:'#eeeeee' }}>
        <Navbar />
    <Router>
      <Routes>
        <Route path ='/signin' element={<Signin />}/>
        <Route path ='/signup' element={<Signup />}/>
      </Routes>
    </Router>
    
    
    </div></>
  );
}

export default App;
