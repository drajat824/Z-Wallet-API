const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors')

require('dotenv/config')

//Middleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.get("/", (request, response) => { response.send("Server is running bro!")});

//Running On
app.listen(process.env.PORT, () => {console.log(`server running on port ${process.env.PORT}`)});

const authRoute =  require("./src/Routes/auth.js")
const profileRoute =  require("./src/Routes/profile.js")
const topupRoute =  require("./src/Routes/topup.js")
const transferRoute =  require("./src/Routes/transfer.js")
const uploadRoute =  require("./src/Routes/upload.js")

app.use("/api/v1", uploadRoute);
app.use("/api/v1", authRoute);
app.use("/api/v1", profileRoute);
app.use("/api/v1", topupRoute);
app.use("/api/v1", transferRoute);


