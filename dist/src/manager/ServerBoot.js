"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
exports.ServerBoot = void 0;
const inversify_1 = require("inversify");
const http_1 = __importDefault(require("http"));
const koa_1 = __importDefault(require("koa"));
const koa_compress_1 = __importDefault(require("koa-compress"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_helmet_1 = __importDefault(require("koa-helmet"));
const types_1 = __importDefault(require("../di/types"));
const BundleController_1 = require("../routes/bundle/BundleController");
const joi_1 = __importDefault(require("@hapi/joi"));
const http2_1 = __importDefault(require("http2"));
const fs_1 = __importDefault(require("fs"));
let ServerBoot = class ServerBoot {
  constructor(bundleController, logger) {
    this.bundleController = bundleController;
    this.logger = logger;
  }

  addListenCallback(server, callback) {
    server.on("listening", () => __awaiter(this, void 0, void 0, function* () {
      yield callback();
    }));
  }

  addServerErrorCallback(server, uiConfiguration) {
    server.on("error", (error) => {
      if (error.syscall !== "listen") {
        throw error;
      }
      switch (error.code) {
        case "EACCES":
          this.logger.fatal(`Port ${uiConfiguration.port} requires elevated privileges`);
          process.exit(1);
          break;
        case "EADDRINUSE":
          this.logger.fatal(`Port ${uiConfiguration.port} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    });
  }

  createApp(port) {
    return __awaiter(this, void 0, void 0, function* () {
      this.koa = new koa_1.default();
      this.koa.use(koa_compress_1.default());
      this.koa.use(koa_helmet_1.default());
    });
  }

  installRoutes(apiConfiguration) {
    const router = new koa_router_1.default();
    this.bundleController.install(router, apiConfiguration);
    this.koa.use(router.routes());
    this.koa.use(router.allowedMethods());
  }

  postStart(uiConfiguration) {
    return __awaiter(this, void 0, void 0, function* () {
      this.logger.info(`Docker Healthchecker API server listening at ${uiConfiguration.port}.`);
    });
  }

  startServer(conf) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.createApp(conf.port);
      this.installRoutes(conf);
      let server;
      if (conf.https) {
        const options = {
          key: fs_1.default.readFileSync(conf.httpsKey),
          cert: fs_1.default.readFileSync(conf.httpsCert),
          allowHTTP1: true
        };
        if (conf.httpsCa !== undefined && conf.httpsCa.length > 0) {
          const caBuffers = [];
          for (const ca of conf.httpsCa)
            caBuffers.push(fs_1.default.readFileSync(ca));
          options.ca = caBuffers;
        }
        if (conf.httpsPassphrase !== undefined && conf.httpsPassphrase !== "") {
          options.passphrase = conf.httpsPassphrase;
        }
        server = http2_1.default.createSecureServer(options, this.koa.callback());
      } else {
        server = http_1.default.createServer(this.koa.callback());
      }
      this.addListenCallback(server, () => __awaiter(this, void 0, void 0, function* () {
        return this.postStart(conf);
      }));
      this.addServerErrorCallback(server, conf);
      const portResult = joi_1.default.number().port().validate(conf.port);
      if (portResult.error) {
        throw new Error("Provided port is not valid");
      }
      server.listen(conf.port);
      return true;
    });
  }
};
ServerBoot = __decorate([
  inversify_1.injectable(),
  __param(0, inversify_1.inject(types_1.default.BundleController)),
  __param(1, inversify_1.inject(types_1.default.Logger)),
  __metadata("design:paramtypes", [BundleController_1.BundleController, Object])
], ServerBoot);
exports.ServerBoot = ServerBoot;
//# sourceMappingURL=ServerBoot.js.map