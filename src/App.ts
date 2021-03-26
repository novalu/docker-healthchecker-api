import yargs from "yargs";
import container from "./di/container";

import { inject, injectable } from "inversify";
import TYPES from "./di/types";
import { Logger } from "./utils/log/Logger";
import * as path from "path";
import * as http from "http";
import {ServerBoot} from "./manager/ServerBoot";
import { ApiFileConfiguration } from "./model/ApiFileConfiguration";
import { Configuration } from "docker-healthchecker";
import { ApiPlainConfiguration } from "./model/ApiPlainConfiguration";

@injectable()
class App {
    constructor(
        @inject(TYPES.ServerBoot) private serverBoot: ServerBoot,
        @inject(TYPES.Logger) public logger: Logger
    ) {}

    public async start(): Promise<boolean> {
        const argv = yargs
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
                console.error(msg)
                process.exit(1)
            })

            .argv;

        let configuration: ApiPlainConfiguration | ApiFileConfiguration;
        if (argv.image !== undefined) {
            configuration = new ApiPlainConfiguration(argv.image as string[], argv.port, argv.https, argv.cert, argv.key);
        } else if (argv.file !== undefined) {
            configuration = new ApiFileConfiguration(argv.file as string, argv.port, argv.https, argv.cert, argv.key);
        } else {
            console.log("Image or file parameter should be provided.");
            return;
        }

        return this.serverBoot.startServer(configuration);
    }

}

export { App }