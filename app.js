//https://www.youtube.com/watch?v=QgqO-3FAvds&feature=youtu.be&fbclid=IwAR0m2QRxC8W-fFfqltILW0TzQuRJ9MtRAOIcXiJtVd_LMoT-zOknYDzy6LU


const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// *********** Include the Api routes ***********
const accountRoutes = require("./routes/accountRoutes");
const userRoutes = require("./routes/userRoutes")
const adminRoutes = require("./routes/adminRoutes")

// *********** Connect to Mongo  ***********
console.log('Attempting to connect to mongoose');

mongoose.connect("mongodb://admin:admin1@ds231133.mlab.com:31133/fullstack_db", {useNewUrlParser: true})
  .then(() => { 
    console.log('Connected to Mongo database!');
  })
  .catch(err  => {
    console.error('App starting error:', err.stack);
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS');

  next();
});

// ******** Setup the Api routes ***********
app.use("/account", accountRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes)

// App listen
app.listen(3000, () => {
  console.log("server listening at port 3000")
});

module.exports = app;
