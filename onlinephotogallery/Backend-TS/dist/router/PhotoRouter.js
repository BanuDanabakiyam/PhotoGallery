"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../model/User"));
exports.router = express_1.default.Router();
exports.router.post("/photos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { photographerName, photoURL, description } = req.body;
        const newUser = new User_1.default({
            photographerName,
            photoURL,
            description,
            createdTime: new Date(),
            isLiked: false
        });
        const savedUser = yield newUser.save();
        res.status(201).json(savedUser);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
exports.router.put('/updateLikeStatus/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { isLiked } = req.body;
        yield User_1.default.findByIdAndUpdate(id, { isLiked });
        res.status(200).send("Like status update successfully");
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
//# sourceMappingURL=PhotoRouter.js.map