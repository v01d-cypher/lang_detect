import * as Router from "koa-router";
import * as Ctrl from "./controllers";

const router = new Router();

router.post("/api/detect", Ctrl.detectLanguage);
router.get("/api/languages", Ctrl.supportedLanguages);

export const routes = router.routes();
