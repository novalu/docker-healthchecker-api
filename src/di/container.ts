import {Container} from "inversify";
import TYPES from "./types";
import {Test} from "../test/Test";
import {App} from "../App";
import {ServerBoot} from "../manager/ServerBoot";
import {BundleController} from "../routes/bundle/BundleController";

const container = new Container();

container
  .bind<Test>(TYPES.Test)
  .to(Test)
  .inSingletonScope();
container
  .bind<App>(TYPES.App)
  .to(App)
  .inSingletonScope();

container
  .bind<ServerBoot>(TYPES.ServerBoot)
  .to(ServerBoot)
  .inSingletonScope();

container
  .bind<BundleController>(TYPES.BundleController)
  .to(BundleController)
  .inSingletonScope();

export default container;