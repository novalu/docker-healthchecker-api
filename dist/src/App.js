"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.App = void 0;
const yargs_1 = __importDefault(require("yargs"));
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("./di/types"));
const ServerBoot_1 = require("./manager/ServerBoot");
const ApiFileConfiguration_1 = require("./model/ApiFileConfiguration");
const ApiPlainConfiguration_1 = require("./model/ApiPlainConfiguration");
let App = class App {
    constructor(serverBoot, logger) {
        this.serverBoot = serverBoot;
        this.logger = logger;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const argv = yargs_1.default
                .help("h")
                .alias("h", "help")
                .group(["image", "file"], "Images:")
                .describe("image", "Docker image to check. Could be defined more times.")
                .alias("i", "image")
                .array("image")
                .string("image")
                .describe("file", "JSON file with image definition in format [{name: string, image: string, alias: string}, ...], where there should be at least name or image. Alias is optional.")
                .alias("f", "file")
                .string("file")
                .group("port", "Server:")
                .describe("port", "Port, on which will server run")
                .alias("p", "port")
                .number("port")
                .default("port", 8080)
                .describe("https", "Enable HTTPS")
                .default("https", false)
                .describe("cert", "Path to HTTPS certificate")
                .string("cert")
                .default("cert", "")
                .describe("key", "Path to HTTPS private key")
                .string("key")
                .default("key", "")
                .fail((msg, err) => {
                console.error(msg);
                process.exit(1);
            })
                .argv;
            let configuration;
            if (argv.image !== undefined) {
                configuration = new ApiPlainConfiguration_1.ApiPlainConfiguration(argv.image, argv.port, argv.https, argv.cert, argv.key);
            }
            else if (argv.file !== undefined) {
                configuration = new ApiFileConfiguration_1.ApiFileConfiguration(argv.file, argv.port, argv.https, argv.cert, argv.key);
            }
            else {
                console.log("Image or file parameter should be provided.");
                return;
            }
            return this.serverBoot.startServer(configuration);
        });
    }
};
App = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.ServerBoot)),
    __param(1, inversify_1.inject(types_1.default.Logger)),
    __metadata("design:paramtypes", [ServerBoot_1.ServerBoot, Object])
], App);
exports.App = App;
//# sourceMappingURL=App.js.map