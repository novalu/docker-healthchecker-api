interface Logger {
    trace(body: string, extra?: any): any;
    debug(body: string, extra?: any): any;
    info(body: string, extra?: any): any;
    warn(body: string, extra?: any): any;
    error(body: string, extra?: any): any;
    fatal(body: string, extra?: any): any;
}
export { Logger };
