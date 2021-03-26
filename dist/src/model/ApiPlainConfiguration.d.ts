import { PlainConfiguration } from "docker-healthchecker";
declare class ApiPlainConfiguration extends PlainConfiguration {
    port: number;
    https: boolean;
    httpsCert: string;
    httpsKey: string;
    constructor(images: string[], port: number, https: boolean, httpsCert: string, httpsKey: string);
}
export { ApiPlainConfiguration };
