const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then((conn)=>{
    console.log(`Database Connected: ${conn.connection.host}`);
})
// .catch(err=>{
//     console.log(`MongoDB Connection Error: ${err}`);
// })

module.exports = mongoose