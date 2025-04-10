const Product = require('../models/product');

const getProducts = async (req, res) => {
    const { sort, order, category, price_gte, price_lte } = req.query;



    try {
        const validSortFields = ["name", "price", "stock", "category"];
        const sortField = validSortFields.includes(sort) ? sort : "name";
        const sortOrder = order === "desc" ? -1 : 1;

        const query = {};

        if (category) {
            query.category = category;
        }

        if (price_gte || price_lte) {
          query.price = { $gte: Number(price_lte), $lte:Number(price_gte)};
        }


        const products = await Product.find(query);

      console.log(query)
        console.log(products)

        res.status(200).json(products);
    } catch (error) {
        console.error('Error in getProducts:', error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

module.exports = { getProducts };
