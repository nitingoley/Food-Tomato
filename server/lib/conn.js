const mongoose = require('mongoose');


const Mongo_url = process.env.MONGO_URL;
const ConnectDB =  async()=>{
  await mongoose.connect(Mongo_url)
  .then((res)=>{
    console.log(`The db connected ${Mongo_url}`);
  })
  .catch((err)=>{
    console.log(`The db is not connected`);
  })
}


module.exports = ConnectDB;