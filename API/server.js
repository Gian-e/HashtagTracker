const express = require("express");
const cors = require("cors");
const http = require('http');
const app = express();
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
}
app.use(allowCrossDomain);
const { Server } = require("socket.io");
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
server.listen(3333, () => {
    console.log('listening on *:3333');
});
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

require("./src/Routes/index")(app);

exports.io = function() { return io; };