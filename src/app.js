import express from "express";
import "dotenv/config";
import http from "http";
import monRouter from "./routes/Router.js";
import './database.js'

const app = express();
const server = http.createServer(app);

//Statics files 
app.set("view engine", "ejs");
app.set("views", "public");

//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//parse application/json
app.use(express.json());

//Routes
app.use('/', monRouter);

//Start server
server.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
