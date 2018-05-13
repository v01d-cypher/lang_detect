import * as Koa from "koa";

const BodyParser = require("koa-bodyparser");
const Helmet = require("koa-helmet");
const Cors = require("@koa/cors");
const Respond = require("koa-respond");
const Serve = require("koa-static");

import { routes } from "./routes";

const app = new Koa();

app.use(Helmet());
app.use(Cors());
app.use(Respond());

app.use(
  BodyParser({
    enableTypes: ["json"],
    jsonLimit: "1mb",
    formLimit: "1mb",
    strict: true,
    onerror: function(err: Error, ctx: Koa.Context) {
      ctx.badRequest({ error: err.message });
    }
  })
);

app.use(routes);
if (process.env.NODE_ENVIRONMENT === "production") {
  app.use(Serve("./build"));
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API server started on ${port}`));
