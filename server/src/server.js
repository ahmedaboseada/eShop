require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`eShop API listening on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server', err.message);
  process.exit(1);
});
