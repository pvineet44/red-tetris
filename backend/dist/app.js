"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});
const PORT = process.env.PORT || 5000;
app.use(cors_1.default());
// app.use(routes)
if (process.env.NODE_ENV == "production") {
    app.use(express_1.default.static('../../public/'));
    const path = require('path');
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../public', 'index.html'));
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
        console.log('new client connected aaa', socket.id);
        // socket.emit('connection', null);
        socket.on('stage', (stage) => {
            // console.log("------------------------------------------------------------------------STAGE is ", stage)
            socket.broadcast.emit('OpponentStage', stage);
        });
    });
})).catch((error) => {
    throw error;
});
