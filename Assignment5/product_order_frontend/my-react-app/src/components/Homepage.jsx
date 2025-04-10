import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/Homepage.css";
import { Link } from "react-router-dom";

const Homepage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);


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

    const Asnd = async (column) => {
        try {
            const response = await axios.get(`/products/get-products?sort=${column}&order=asc`);
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            alert(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    const dsc = async (column) => {
        try {
            const response = await axios.get(`/products/get-products?sort=${column}&order=desc`);
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            alert(`Error: ${error.response?.data?.message || error.message}`);
        }
    };

    const category_price=async (category,max,min) => {
        try{
            console.log(typeof max); // "string"
            const response = await axios.get(`/products/get-products?category=${category}&price_gte=${min}&price_lte=${max}`);
            setProducts(response.data);
            setLoading(false);
        }
        catch(error){
            alert(`Error: ${error.message}`)
        }
        
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="homepage">
            <h1>Welcome to The Store</h1>
            <div className="nav-links">
                <Link to="/" className="menu-item">Homepage</Link>
                <Link to="/order" className="menu-item">Order List</Link>
            </div>
            <div className="filter">
                <select onChange={(e) => setCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="books">Books</option>
                </select>
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
<button onClick={() => category_price(selectedCategory, minPrice, maxPrice)}>Apply Filters</button>
            </div>

            <div className="table-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>
                                Name
                                <div>
                                    <button onClick={() => Asnd("name")}>🔼</button>
                                    <button onClick={() => dsc("name")}>🔽</button>
                                </div>
                            </th>

                            <th>
                                Category
                                <div>
                                    <button onClick={() => Asnd("category")}>🔼</button>
                                    <button onClick={() => dsc("category")}>🔽</button>
                                </div>
                            </th>
                            <th>
                                Price ($)
                                <div>
                                    <button onClick={() => Asnd("price")}>🔼</button>
                                    <button onClick={() => dsc("price")}>🔽</button>
                                </div>
                            </th>
                            <th>
                                Stock
                                <div>
                                    <button onClick={() => Asnd("stock")}>🔼</button>
                                    <button onClick={() => dsc("stock")}>🔽</button>
                                </div>
                            </th>
                            <th>Add to Cart</th>
                            <th>Action</th>
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
                                <td>Order ▶️</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Homepage;
