import { inject, injectable } from "inversify";
import TYPES from "../di/types";
import {Logger} from "../utils/log/Logger";
import {ServerBoot} from "../manager/ServerBoot";
import { ApiFileConfiguration } from "../model/ApiFileConfiguration";
import { ApiPlainConfiguration } from "../model/ApiPlainConfiguration";

@injectable()
class Test {
    constructor(
        @inject(TYPES.ServerBoot) private serverBoot: ServerBoot,
        @inject(TYPES.Logger) public logger: Logger
    ) {}

    public async start(): Promise<boolean> {
        // const configuration = new UiFileConfiguration(
        //     [ "test", "test1", "test2", "test3", "test4" ],
        //     undefined,
        //     8080
        // );
        const configuration = new ApiPlainConfiguration(
            [ "mongo-festapp-nocvedcu-local" ],
            8080
        );
        return this.serverBoot.startServer(configuration);
    }

}

export { Test }