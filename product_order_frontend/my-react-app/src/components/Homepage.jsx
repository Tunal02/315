import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../style/Homepage.css"; 
import { Link } from "react-router-dom";



const Homepage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("products/get-products"); 
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch products. Please try again later.");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleSubmit = async (id) => {
        try {
            const response = await axios.post("/orders/add-to-cart", {
                productId: id,
            });
    
            console.log("Order placed:", response.data);
        } catch (error) {
            alert(`Error: ${error.response.data.message }`);

        }
    };
    

    return (
        <div className="homepage">
            <h1>Welcome to The Store</h1>
            <Link to="/" className="menu-item" >hompage</Link>      
            <Link to="/order" className="menu-item" >Orderlist</Link>            
      
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.title} />
                        <h3>{product.name}</h3>
                        <p>price:${product.price}</p>
                        <p>Catergory:{product.category}</p>
                        <p>stock:{product.stock}</p>


                        <button onClick={() => handleSubmit(product._id)}>Add to Cart</button>       
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;