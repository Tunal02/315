const Order = require('../models/order'); 
const Product = require('../models/product'); 


const placeOrder=async (req,res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    var date_time = new Date();



try{

    const { productId } = req.body;

    const product = await Product.findById(productId).session(session);
    const name=product.name
    const category=product.category
    
    if (!product) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (product.stock < 1) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: 'Insufficient stock' });
      }
      product.stock-=1 
      await product.save({ session });
      
      const quantity=product.stock

    const order = new Order({
        productId,
        productName: product.name,
        quantity,
        deliveryDate:date_time
    });

    await order.save({ session });

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ message: 'Order placed successfully', order });
}
catch(error){
    await session.abortTransaction()
    session.endSession()
    console.log(error)
    return res.status(400).json({ message: 'Transaction  failed ' });

}


}

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}); 
    res.status(200).json(orders); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

module.exports = { placeOrder, getOrders };
