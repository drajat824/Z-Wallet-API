const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors')
require('dotenv/config')

const server = require('http').createServer(app);
const io = require('socket.io')(server)
io.on('connection', (socket)=> {
    const itemId = socket.handshake.query.itemId
    console.log('user connect', itemId)
    socket.join(itemId)
    socket.on('new-chat', (chat) => {
        console.log(chat)
        socket.broadcast.to(itemId).emit('refresh-chat', chat)
    })
})

//Middleware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.get("/", (request, response) => { response.send("Server is running bro!")});

//Running On
server.listen(8000, () => {console.log(`server running on port 8000`)});
app.use("*", cors());
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


