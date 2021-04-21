import Router from "koa-router";
import {ApiFileConfiguration} from "../../model/ApiFileConfiguration";
import {ApiPlainConfiguration} from "../../model/ApiPlainConfiguration";

export declare class BundleController {
  router: Router;
  apiConfiguration: ApiFileConfiguration | ApiPlainConfiguration;
  private serve;

  install(router: Router, apiConfiguration: ApiFileConfiguration | ApiPlainConfiguration): void;
}
