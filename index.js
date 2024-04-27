const express = require("express");
const app = express();
const cors = require('cors');
require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const router = require("./routes/routes");
const connectWithDB = require("./config/db");
connectWithDB();

app.listen(PORT,()=>{
    console.log(`App is running at PORT ${PORT}`);
})
app.use("api/v1",router);


