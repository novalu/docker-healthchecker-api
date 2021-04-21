import { ApiFileConfiguration } from "../model/ApiFileConfiguration";
import { ApiPlainConfiguration } from "../model/ApiPlainConfiguration";
import Koa from "koa";
import { BundleController } from "../routes/bundle/BundleController";
import { Logger } from "../utils/log/Logger";
export declare class ServerBoot {
    private bundleController;
    logger: Logger;
    koa: Koa;
    constructor(bundleController: BundleController, logger: Logger);
    private addListenCallback;
    private addServerErrorCallback;
    createApp(port: number): Promise<void>;
    private installRoutes;
    private postStart;
    startServer(conf: ApiFileConfiguration | ApiPlainConfiguration): Promise<boolean>;
}
