import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/Homepage.css";
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

    const handleSubmit = async (id) => {
        try {
            const response = await axios.post("/orders/add-to-cart", {
                productId: id,
            });
            console.log("Order placed:", response.data);
        } catch (error) {
            alert(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="homepage">
            <h1>Welcome to The Store</h1>
            <div className="nav-links">
                <Link to="/" className="menu-item">Homepage</Link>
                <Link to="/order" className="menu-item">Order List</Link>
            </div>

            <div className="table-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price ($)</th>
                            <th>Stock</th>
                            <th>Add to Cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <button onClick={() => handleSubmit(product._id)}>Add</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Homepage;
