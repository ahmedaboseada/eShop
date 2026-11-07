const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');

async function createOrder(req, res, next) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { shippingAddress } = req.body;
    if (!shippingAddress) {
      await session.abortTransaction();
      return res.status(400).json({ success: false, message: 'Shipping address is required' });
    }

    const cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product')
      .session(session);

    if (!cart || cart.items.length === 0) {
      await session.abortTransaction();
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    for (const item of cart.items) {
      if (!item.product || item.product.quantity < item.quantity) {
        await session.abortTransaction();
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${item.product?.title || 'a product'}`,
        });
      }
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const [order] = await Order.create(
      [
        {
          user: req.user._id,
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

    for (const item of cart.items) {
      await Product.findByIdAndUpdate(
        item.product._id,
        {
          $inc: {
            quantity: -item.quantity,
            sold: item.quantity,
          },
        },
        { session }
      );
    }

    cart.items = [];
    await cart.save({ session });
    await session.commitTransaction();

    const populated = await Order.findById(order._id).populate('items.product');
    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
}

async function listMyOrders(req, res, next) {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
}

async function getOrder(req, res, next) {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
}

module.exports = { createOrder, listMyOrders, getOrder };
