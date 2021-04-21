import "reflect-metadata";
import container from "../di/container";
import TYPES from "../di/types";
import PrettyError from "pretty-error";

import {Test} from "./Test";
import {Logger} from "../utils/log/Logger";
import {SignaleLogger} from "../utils/log/impl/SignaleLogger";

async function start(): Promise<Test> {
  container.bind<Logger>(TYPES.Logger).to(SignaleLogger).inSingletonScope();

  const app = container.get<Test>(TYPES.Test);
  const started = await app.start();
  return started ? app : undefined;
}

(async () => {
  let test;
  try {
    test = await start();
  } catch (err) {
    const msg = "Cannot start application";
    if (test) {
      test.logger.fatal(msg, err);
    } else {
      const pe = new PrettyError();
      // tslint:disable-next-line:no-console
      console.error(`${msg}, error: ${pe.render(err)}`);
    }
  }
})();