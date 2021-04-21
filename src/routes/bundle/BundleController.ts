import {injectable} from "inversify";
import Router from "koa-router";
import Koa from "koa";
import {ApiFileConfiguration} from "../../model/ApiFileConfiguration";
import {ApiPlainConfiguration} from "../../model/ApiPlainConfiguration";
import {containersHealth} from "docker-healthchecker";

@injectable()
export class BundleController {

  public router: Router;

  public apiConfiguration: ApiFileConfiguration | ApiPlainConfiguration;

  private async serve(ctx: Koa.Context) {
    ctx.body = await containersHealth(this.apiConfiguration);
  }

  public install(router: Router, apiConfiguration: ApiFileConfiguration | ApiPlainConfiguration) {
    this.router = router;
    this.apiConfiguration = apiConfiguration;

    router.get("/", async (ctx, next) => {
      await this.serve(ctx);
    })
  }

}