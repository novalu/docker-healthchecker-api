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
require("reflect-metadata");
const container_1 = __importDefault(require("../di/container"));
const types_1 = __importDefault(require("../di/types"));
const pretty_error_1 = __importDefault(require("pretty-error"));
const SignaleLogger_1 = require("../utils/log/impl/SignaleLogger");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        container_1.default.bind(types_1.default.Logger).to(SignaleLogger_1.SignaleLogger).inSingletonScope();
        const app = container_1.default.get(types_1.default.Test);
        const started = yield app.start();
        return started ? app : undefined;
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    let test;
    try {
        test = yield start();
    }
    catch (err) {
        const msg = "Cannot start application";
        if (test) {
            test.logger.fatal(msg, err);
        }
        else {
            const pe = new pretty_error_1.default();
            // tslint:disable-next-line:no-console
            console.error(`${msg}, error: ${pe.render(err)}`);
        }
    }
}))();
//# sourceMappingURL=start.js.map