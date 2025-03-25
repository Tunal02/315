import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Dashboard from "./components/Dashboard"

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;


function App() {
  return (
    <BrowserRouter>
      <Routes>
                <Route path="/" element={<Dashboard/>} />
               
            </Routes>
  
    </BrowserRouter>
    
  );
}

export default App;
