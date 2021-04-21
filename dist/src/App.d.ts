import { Logger } from "./utils/log/Logger";
import { ServerBoot } from "./manager/ServerBoot";
declare class App {
    private serverBoot;
    logger: Logger;
    constructor(serverBoot: ServerBoot, logger: Logger);
    start(): Promise<boolean>;
}
export { App };
