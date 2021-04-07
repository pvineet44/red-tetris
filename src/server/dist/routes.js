"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teest_1 = require("./teest");
const router = express_1.Router();
router.get("/test", teest_1.testApi);
exports.default = router;
