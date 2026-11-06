const EventEmitter = require('events');
const fs = require('fs');
const Cart = require('../models/Cart');

class AuthObserver extends EventEmitter {
  constructor() {
    super();
    this.on('userSignedUp', ({ userId, email }) => {
      fs.appendFileSync(
        'logs/auth.log',
        `User signed up: ID=${userId}, Email=${email}, Time=${new Date().toISOString()}\n`
      );
    });
    this.on('userSignedUp', async ({ userId }) => {
      try {
        await Cart.create({ user: userId, items: [] });
        console.log(`Created default cart for user: ${userId}`);
      } catch (error) {
        console.error(`Failed to create cart for ${userId}:`, error.message);
      }
    });
    this.on('userSignedIn', ({ userId, email }) => {
      fs.appendFileSync(
        'logs/auth.log',
        `User signed in: ID=${userId}, Email=${email}, Time=${new Date().toISOString()}\n`
      );
    });
    this.on('tokenRefreshed', ({ userId, email }) => {
      fs.appendFileSync(
        'logs/auth.log',
        `Token refreshed: ID=${userId}, Email=${email}, Time=${new Date().toISOString()}\n`
      );
    });
  }
}

module.exports = new AuthObserver();