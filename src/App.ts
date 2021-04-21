import yargs from "yargs";
import Joi from "joi";
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
              process.exit(1)
          })

          .argv;

        this.logger.debug("Yargs:");
        this.logger.debug(JSON.stringify(argv));

        const schema = Joi.object({
            image: Joi.array().items(Joi.string()),
            file: Joi.string(),
            port: Joi.number().port().required(),
            https: Joi.bool().default(false),
            cert: Joi.string().allow("").when("https", {is: true, then: Joi.disallow("").required()}),
            key: Joi.string().allow("").when("https", {is: true, then: Joi.disallow("").required()}),
            ca: Joi.array().items(Joi.string()),
            passphrase: Joi.string().allow("")
        });

        const options = schema.validate(argv, {allowUnknown: true});
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

        let configuration: ApiPlainConfiguration | ApiFileConfiguration;
        if (argv.image !== undefined) {
            configuration = new ApiPlainConfiguration(image, port, https, cert, key, ca, passphrase);
        } else if (argv.file !== undefined) {
            configuration = new ApiFileConfiguration(file, port, https, cert, key, ca, passphrase);
        } else {
            this.logger.error("Image or file parameter should be provided.");
            return;
        }

        return this.serverBoot.startServer(configuration);
    }

}

export { App }