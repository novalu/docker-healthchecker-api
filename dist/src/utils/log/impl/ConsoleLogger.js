"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
const inversify_1 = require("inversify");
let ConsoleLogger = class ConsoleLogger {
    debug(body, extra) {
        console.log(body);
    }
    error(body, extra) {
        console.log(body);
    }
    info(body, extra) {
        console.log(body);
    }
    trace(body, extra) {
        console.log(body);
    }
    warn(body, extra) {
        console.log(body);
    }
    fatal(body, extra) {
        console.log(body);
    }
};
ConsoleLogger = __decorate([
    inversify_1.injectable()
], ConsoleLogger);
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=ConsoleLogger.js.map