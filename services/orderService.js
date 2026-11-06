const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');

class OrderService {
  async createOrder(userId, { shippingAddress }) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // Get cart
      const cart = await Cart.findOne({ user: userId })
        .populate('items.product')
        .session(session);
      if (!cart || cart.items.length === 0) {
        throw new Error('Cart is empty');
      }

      // Validate stock
      for (const item of cart.items) {
        if (item.product.stockQuantity < item.quantity) {
          throw new Error(`Insufficient stock for ${item.product.name}`);
        }
      }

      // Calculate total
      const totalAmount = cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      // Create order
      const order = await Order.create(
        [
          {
            user: userId,
            items: cart.items.map((item) => ({
              product: item.product._id,
              quantity: item.quantity,
              unitPrice: item.product.price,
            })),
            totalAmount,
            shippingAddress,
          },
        ],
        { session }
      );

      // Update stock
      for (const item of cart.items) {
        await Product.findByIdAndUpdate(
          item.product._id,
          { $inc: { stockQuantity: -item.quantity } },
          { session }
        );
      }

      // Clear cart
      cart.items = [];
      await cart.save({ session });

      await session.commitTransaction();
      return order[0].populate('items.product');
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

module.exports = new OrderService();