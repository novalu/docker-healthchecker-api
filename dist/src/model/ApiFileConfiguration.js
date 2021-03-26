"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFileConfiguration = void 0;
const docker_healthchecker_1 = require("docker-healthchecker");
class ApiFileConfiguration extends docker_healthchecker_1.FileConfiguration {
    constructor(filePath, port = 8080, https, httpsCert, httpsKey) {
        super(filePath, [new docker_healthchecker_1.ConsoleConsumerOptions(false)]);
        this.port = port;
        this.https = https;
        this.httpsCert = httpsCert;
        this.httpsKey = httpsKey;
    }
}
exports.ApiFileConfiguration = ApiFileConfiguration;
//# sourceMappingURL=ApiFileConfiguration.js.map