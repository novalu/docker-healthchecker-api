import { ConsoleConsumerOptions, PlainConfiguration} from "docker-healthchecker";

class ApiPlainConfiguration extends PlainConfiguration{
    constructor(
        images: string[],
        public port: number = 8080
    ) {
        super(images, []);
    }
}

export { ApiPlainConfiguration }