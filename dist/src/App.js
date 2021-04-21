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
const joi_1 = __importDefault(require("joi"));
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
                .group(["image", "file"], "Definition:")
                .options({
                i: {
                    alias: "image",
                    describe: "Docker image to check. Could be defined more times.",
                    array: true,
                    string: true
                },
                f: {
                    alias: "file",
                    describe: "JSON file with image definition in format [{name: string, image: string, alias: string}, ...], " +
                        "where there should be at least name or image. Alias is optional.",
                    type: "string",
                    nargs: 1
                }
            })
                .group(["port", "https", "cert", "key", "ca", "passphrase"], "Server:")
                .options({
                p: {
                    alias: "port",
                    number: true,
                    default: 8080
                },
                https: {
                    describe: "Enable HTTPS"
                },
                cert: {
                    describe: "Path to HTTPS certificate",
                    string: true,
                    default: ""
                },
                key: {
                    describe: "Path to HTTPS key",
                    string: true,
                    default: ""
                },
                ca: {
                    describe: "Path to HTTPS certificate authorities. Could be repeated more times. Optional.",
                    string: true,
                    array: true
                },
                passphrase: {
                    describe: "HTTPS passphrase. Optional.",
                    string: true,
                    default: ""
                }
            })
                .fail((msg, err) => {
                this.logger.error("Failed validate CLI parameters", err);
                process.exit(1);
            })
                .argv;
            this.logger.debug("Yargs:");
            this.logger.debug(JSON.stringify(argv));
            const schema = joi_1.default.object({
                image: joi_1.default.array().items(joi_1.default.string()),
                file: joi_1.default.string(),
                port: joi_1.default.number().port().required(),
                https: joi_1.default.bool().default(false),
                cert: joi_1.default.string().allow("").when("https", { is: true, then: joi_1.default.disallow("").required() }),
                key: joi_1.default.string().allow("").when("https", { is: true, then: joi_1.default.disallow("").required() }),
                ca: joi_1.default.array().items(joi_1.default.string()),
                passphrase: joi_1.default.string().allow("")
            });
            const options = schema.validate(argv, { allowUnknown: true });
            if (options.error) {
                this.logger.error("Failed validate CLI parameters", options.error);
                process.exit(1);
            }
            const image = options.value.image;
            const file = options.value.file;
            const port = options.value.port;
            const https = options.value.https;
            const cert = options.value.cert;
            const key = options.value.key;
            const ca = options.value.ca;
            const passphrase = options.value.passphrase;
            this.logger.debug("Joi:");
            this.logger.debug(JSON.stringify({ image, file, port, https, cert, key, ca, passphrase }));
            if ((!image && !file) || (image && file)) {
                this.logger.error("Only one of image and file should be provided");
            }
            let configuration;
            if (argv.image !== undefined) {
                configuration = new ApiPlainConfiguration_1.ApiPlainConfiguration(image, port, https, cert, key, ca, passphrase);
            }
            else if (argv.file !== undefined) {
                configuration = new ApiFileConfiguration_1.ApiFileConfiguration(file, port, https, cert, key, ca, passphrase);
            }
            else {
                this.logger.error("Image or file parameter should be provided.");
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