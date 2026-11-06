const orderService = require('../services/orderService');

class OrderController {
  async createOrder(req, res, next) {
    try {
      const { shippingAddress } = req.body;
      if (!shippingAddress) {
        return res.status(400).json({ message: 'Shipping address is required' });
      }
      const order = await orderService.createOrder(req.user.id, { shippingAddress });
      return res.status(201).json({
        message: 'Order created successfully',
        order,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();