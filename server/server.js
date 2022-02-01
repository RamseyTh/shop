const express = require("express");
const app = express();
const config = require("./config/config")
const routes = require("./routes/routes");
const cors = require("cors"); //cross-domain
const path = require("path");
app.use(cors());
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type"); //header type
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS"); //cross domain request
  next(); 
});
let bodyParser = require("body-parser"); //post type
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use("/public", express.static(path.join(__dirname, "./public")));//Static template
new routes(app);//Initialize router

app.listen(config.ServerPort, () => {
  console.log("Server Start~");
});
