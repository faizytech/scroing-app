const mongoose = require('mongoose');

main().catch(err => console.log(err));


async function main() {
    const options = {
        useNewUrlParser: true,
        autoIndex: true, 
        keepAlive: true,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        family: 4, // Use IPv4, skip trying IPv6
        useUnifiedTopology: true
      }
  await mongoose.connect(process.env.MONGO_DB_URL,options);
  console.log("Mongo DB Connected");
}