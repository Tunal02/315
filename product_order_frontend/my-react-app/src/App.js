import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Order from "./components/orderList";
import Homepage from "./components/Homepage";

axios.defaults.baseURL = "http://localhost:5001";
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <div className="content-container">
        <Routes>
          <Route path="/order" element={<Order />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;