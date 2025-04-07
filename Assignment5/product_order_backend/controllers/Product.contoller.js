const Product = require('../models/product');

const getProducts = async (req, res) => {
    const { sort, order, category, min, max } = req.query;

    try {
        const validSortFields = ["name", "price", "stock", "category"];
        const sortField = validSortFields.includes(sort) ? sort : "name";
        const sortOrder = order === "desc" ? -1 : 1;

        const query = {};

        if (category) {
            query.category = category;
        }

        if (min && max) {
            query.price = { $gte: Number(min), $lte: Number(max) }; 
        }

        const products = await Product.find(query).sort({ [sortField]: sortOrder });

        res.status(200).json(products);
    } catch (error) {
        console.error('Error in getProducts:', error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

module.exports = { getProducts };
