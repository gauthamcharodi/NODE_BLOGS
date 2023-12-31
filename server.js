require("dotenv").config();
const http = require("http");
const mongoose=require("mongoose");
const app = require("./app");
const { log } = require("console");
const PORT = process.env.PORT;
const MONGOLOCAL_URL=process.env.MONGOLOCAL_URL

const Server = http.createServer(app);

mongoose.connect(MONGOLOCAL_URL).then(()=>{
    console.log("db connected");
}).catch((err)=>{
    console.log(err);
})

Server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`listening on ${PORT}...`);
});

// console.log(process.env);