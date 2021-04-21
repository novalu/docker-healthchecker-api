import {Logger} from "../Logger";

declare class ConsoleLogger implements Logger {
  debug(body: string, extra?: any): void;

  error(body: string, extra?: any): void;

  info(body: string, extra?: any): void;

  trace(body: string, extra?: any): void;

  warn(body: string, extra?: any): void;

  fatal(body: string, extra?: any): void;
}

export {ConsoleLogger};
