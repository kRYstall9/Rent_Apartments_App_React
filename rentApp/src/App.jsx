import Login from '../src/Pages/Login/Login';
import Register from "../src/Pages/Register/Register";
import Homepage from "../src/Pages/Homepage/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../src/App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/Homepage" element={<Homepage />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
