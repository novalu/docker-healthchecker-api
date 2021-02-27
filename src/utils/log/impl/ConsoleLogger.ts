import { injectable } from "inversify";
import PrettyError from "pretty-error";
import signale, { Signale } from "signale";
import { Logger } from "../Logger";

@injectable()
class ConsoleLogger implements Logger {
  public debug(body: string, extra?: any) {
    console.log(body);
  }

  public error(body: string, extra?: any) {
    console.log(body);
  }

  public info(body: string, extra?: any) {
    console.log(body);
  }

  public trace(body: string, extra?: any) {
    console.log(body);
  }

  public warn(body: string, extra?: any) {
    console.log(body);
  }

  public fatal(body: string, extra?: any) {
    console.log(body);
  }
}

export { ConsoleLogger };
