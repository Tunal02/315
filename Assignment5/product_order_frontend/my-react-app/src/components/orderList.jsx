import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";

import axios from 'axios';
import "../style/orderList.css"
const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/orders/getorder')
      .then((response) => setOrders(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="orders-container">
      <h1>Orders List</h1>
       <Link to="/" className="menu-item" >hompage</Link>  
       <Link to="/order" className="menu-item" >Orderlist</Link>            
            
      <div className="orders-grid">
        
        {orders.map((order) => (
          <div className="order-row" key={order._id}>
            <div>ID:{order._id}</div>
            <div>Name:{order.productName}</div>
            <div>Stock:{order.quantity}</div>
            <div>Delivery_Date:{order.deliveryDate}</div>
            <p></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;