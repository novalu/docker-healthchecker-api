import {ConsoleConsumerOptions, FileConfiguration} from "docker-healthchecker";

class ApiFileConfiguration extends FileConfiguration {
  constructor(
    filePath: string,
    public port: number = 8080,
    public https: boolean,
    public httpsCert: string,
    public httpsKey: string,
    public httpsCa: string[],
    public httpsPassphrase: string
  ) {
    super(filePath, [new ConsoleConsumerOptions(false)]);
  }
}

export {ApiFileConfiguration}