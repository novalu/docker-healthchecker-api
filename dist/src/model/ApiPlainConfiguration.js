"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPlainConfiguration = void 0;
const docker_healthchecker_1 = require("docker-healthchecker");
class ApiPlainConfiguration extends docker_healthchecker_1.PlainConfiguration {
    constructor(images, port = 8080, https, httpsCert, httpsKey, httpsCa, httpsPassphrase) {
        super(images, []);
        this.port = port;
        this.https = https;
        this.httpsCert = httpsCert;
        this.httpsKey = httpsKey;
        this.httpsCa = httpsCa;
        this.httpsPassphrase = httpsPassphrase;
    }
}
exports.ApiPlainConfiguration = ApiPlainConfiguration;
//# sourceMappingURL=ApiPlainConfiguration.js.map