"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPlainConfiguration = void 0;
const docker_healthchecker_1 = require("docker-healthchecker");
class ApiPlainConfiguration extends docker_healthchecker_1.PlainConfiguration {
    constructor(images, port = 8080) {
        super(images, []);
        this.port = port;
    }
}
exports.ApiPlainConfiguration = ApiPlainConfiguration;
//# sourceMappingURL=ApiPlainConfiguration.js.map