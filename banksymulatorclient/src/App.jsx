import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import Register from './Components/RegisterComponent/Register';
// import Login from './Components/LoginComponent/Login';
import Login from './Components/LoginComponent/Login';
import Register from './Components/RegisterComponent/Register';
import Navbar from './Components/NavbarComponent/Navbar';

// function NavigationButton() {
//   const navigate = useNavigate();
//   return (
//     <>
//       <button onClick={() => navigate('/register')}>Go to Register</button>;
//       <button onClick={() => navigate('/login')}>Go to Login</button>
//     </>
//     );
// }

function App() {
  return (
    <Router>
      {/* <NavigationButton /> */}
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;