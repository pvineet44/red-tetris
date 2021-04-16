"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const tetrominos_1 = require("./tetrominos");
const app = express_1.default();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});
const PORT = process.env.PORT || 4000;
app.use(cors_1.default());
app.use(routes_1.default);
if (process.env.NODE_ENV == "production") {
    app.use(express_1.default.static('../client/build'));
    const path = require('path');
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
}
// console.log(`Server running on http://localhost:${PORT}`)
const uri = 'mongodb+srv://admin:admin@cluster0.s5t7m.mongodb.net/red-tetris';
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose_1.default.set("useFindAndModify", false);
mongoose_1.default
    .connect(uri, options)
    .then(() => http.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`, __dirname);
    io.on('connection', (socket) => {
        console.log('new client connected aaa', tetrominos_1.randomTetrominoArray());
        // socket.emit("tetroarray", randomTetrominoArray())
        // socket.emit('connection', null);
        socket.on('stage', (stage) => {
            // console.log("------------------------------------------------------------------------STAGE is ", stage)
            socket.broadcast.emit('OpponentStage', stage);
        });
    });
})).catch((error) => {
    throw error;
});
