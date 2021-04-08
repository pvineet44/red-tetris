"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
const path = require('path');
const PORT = process.env.PORT || 4000;
app.use(cors_1.default());
app.use(express_1.default.static(path.join(__dirname, '../../build')));
app.use('/api', routes_1.default);
app.get('*', (req, res) => {
    console.log('hello world!!!ssss!!-!!');
    res.sendFile(path.join(__dirname, '../../build'));
});
// console.log(`Server running on http://localhost:${PORT}`)
const uri = 'mongodb+srv://admin:admin@cluster0.s5t7m.mongodb.net/red-tetris';
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose_1.default.set("useFindAndModify", false);
mongoose_1.default
    .connect(uri, options)
    .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))).catch((error) => {
    throw error;
});
