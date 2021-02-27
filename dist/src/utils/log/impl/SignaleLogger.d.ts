import { Logger } from "../Logger";
declare class SignaleLogger implements Logger {
    private pe;
    private signale;
    constructor();
    private logExtra;
    debug(body: string, extra?: any): void;
    error(body: string, extra?: any): void;
    info(body: string, extra?: any): void;
    trace(body: string, extra?: any): void;
    warn(body: string, extra?: any): void;
    fatal(body: string, extra?: any): void;
}
export { SignaleLogger };
