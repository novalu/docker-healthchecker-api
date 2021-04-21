import {injectable} from "inversify";
import {Logger} from "../Logger";

@injectable()
class NoOpLogger implements Logger {

  constructor() {

  }

  public debug(body: string, extra?: any) {

  }

  public error(body: string, extra?: any) {

  }

  public info(body: string, extra?: any) {

  }

  public trace(body: string, extra?: any) {

  }

  public warn(body: string, extra?: any) {

  }

  public fatal(body: string, extra?: any) {

  }
}

export {NoOpLogger};
