const app = require('../server/src/app');
const connectDB = require('../server/src/config/db');

let ready;

async function ensureDb() {
  if (!ready) {
    ready = connectDB().catch((err) => {
      console.error('DB connect failed:', err.message);
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
    console.error('API handler error:', error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: error.message || 'Database connection failed',
      });
    }
  }
};
