import {inject, injectable} from "inversify";
import http from "http";
import {ApiFileConfiguration} from "../model/ApiFileConfiguration";
import {ApiPlainConfiguration} from "../model/ApiPlainConfiguration";
import Koa from "koa";
import Compress from "koa-compress";
import Router from "koa-router";
import Helmet from "koa-helmet";
import path from "path";
import TYPES from "../di/types";
import {BundleController} from "../routes/bundle/BundleController";
import {Logger} from "../utils/log/Logger";
import Joi from "@hapi/joi";

@injectable()
export class ServerBoot {

    public koa: Koa;

    constructor(
        @inject(TYPES.BundleController) private bundleController: BundleController,
        @inject(TYPES.Logger) public logger: Logger
    ) {}

    private addListenCallback(server, callback: () => void) {
        server.on("listening", async () => {
            await callback();
        });
    }

    private addServerErrorCallback(server, uiConfiguration: ApiFileConfiguration | ApiPlainConfiguration) {
        server.on("error", (error: any) => {
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

    public async createApp(port: number) {
        this.koa = new Koa();
        this.koa.use(Compress());
        this.koa.use(Helmet());
    }

    private installRoutes(apiConfiguration: ApiFileConfiguration | ApiPlainConfiguration) {
        const router: Router = new Router();
        this.bundleController.install(router, apiConfiguration);
        this.koa.use(router.routes());
        this.koa.use(router.allowedMethods());
    }

    private async postStart(uiConfiguration: ApiFileConfiguration | ApiPlainConfiguration) {
        this.logger.info(`Docker Healthchecker API server listening at ${uiConfiguration.port}.`);
    }

    public async startServer(apiConfiguration: ApiFileConfiguration | ApiPlainConfiguration): Promise<boolean> {
        await this.createApp(apiConfiguration.port);
        this.installRoutes(apiConfiguration);
        const server = http.createServer(this.koa.callback());
        this.addListenCallback(server, async () => this.postStart(apiConfiguration));
        this.addServerErrorCallback(server, apiConfiguration);

        const portResult = Joi.number().port().validate(apiConfiguration.port);
        if (portResult.error) {
            throw new Error("Provided port is not valid");
        }
        server.listen(apiConfiguration.port);

        return true;
    }

}