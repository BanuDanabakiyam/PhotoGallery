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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const PhotoRouter_1 = require("./router/PhotoRouter");
const User_1 = __importDefault(require("./model/User"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/', PhotoRouter_1.router);
const port = 8000;
const url = "mongodb+srv://banubala9655:12345@cluster0.fo9wq9u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose_1.default.connect(url).then(() => {
    console.log("I am connected...");
});
app.get('/getPhotos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        res.json(users);
    }
    catch (err) {
        const error = {
            message: 'Internal server error',
            status: 500
        };
    }
}));
app.listen(port, () => {
    console.log("I am listenning...");
});
//# sourceMappingURL=server.js.map