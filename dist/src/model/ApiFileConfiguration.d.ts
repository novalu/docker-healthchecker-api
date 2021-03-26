import { FileConfiguration } from "docker-healthchecker";
declare class ApiFileConfiguration extends FileConfiguration {
    port: number;
    https: boolean;
    httpsCert: string;
    httpsKey: string;
    constructor(filePath: string, port: number, https: boolean, httpsCert: string, httpsKey: string);
}
export { ApiFileConfiguration };
