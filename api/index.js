require('dotenv').config();
const app = require('../server/src/app');
const connectDB = require('../server/src/config/db');

let ready;

async function ensureDb() {
  if (!ready) {
    ready = connectDB().catch((err) => {
      ready = null;
      throw err;
    });
  }
  await ready;
}

module.exports = async (req, res) => {
  try {
    await ensureDb();
    return app(req, res);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Database connection failed' });
  }
};
