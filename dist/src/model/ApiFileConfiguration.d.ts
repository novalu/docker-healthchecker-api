import { FileConfiguration } from "docker-healthchecker";
declare class ApiFileConfiguration extends FileConfiguration {
    port: number;
    constructor(filePath: string, port?: number);
}
export { ApiFileConfiguration };
