import { PlainConfiguration } from "docker-healthchecker";
declare class ApiPlainConfiguration extends PlainConfiguration {
    port: number;
    constructor(images: string[], port?: number);
}
export { ApiPlainConfiguration };
