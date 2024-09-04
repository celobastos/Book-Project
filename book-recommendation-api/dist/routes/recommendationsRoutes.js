"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recommendationsController_1 = require("../controllers/recommendationsController");
const router = express_1.default.Router();
router.get('/', recommendationsController_1.getRecommendations);
exports.default = router;
