"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("./types"));
const Test_1 = require("../test/Test");
const App_1 = require("../App");
const ServerBoot_1 = require("../manager/ServerBoot");
const BundleController_1 = require("../routes/bundle/BundleController");
const container = new inversify_1.Container();
container
  .bind(types_1.default.Test)
  .to(Test_1.Test)
  .inSingletonScope();
container
  .bind(types_1.default.App)
  .to(App_1.App)
  .inSingletonScope();
container
  .bind(types_1.default.ServerBoot)
  .to(ServerBoot_1.ServerBoot)
  .inSingletonScope();
container
  .bind(types_1.default.BundleController)
  .to(BundleController_1.BundleController)
  .inSingletonScope();
exports.default = container;
//# sourceMappingURL=container.js.map