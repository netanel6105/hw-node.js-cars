const mongoose = require('mongoose');
const {config} = require("../config/secret")
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${config.userDB}:${config.userPass}@clustercats.lmrhiow.mongodb.net/hw-cars`);
  console.log("mongo conect hw-cars atlas");
  
}

