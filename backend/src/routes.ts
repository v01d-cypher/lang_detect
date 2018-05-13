import * as Router from "koa-router";
import * as Ctrl from "./controllers";

const router = new Router();

router.post("/detect", Ctrl.detectLanguage);
router.get("/languages", Ctrl.supportedLanguages);

export const routes = router.routes();
