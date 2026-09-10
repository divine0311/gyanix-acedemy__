import { Router, type IRouter } from "express";
import healthRouter from "./health";
import enquiryRouter from "./enquiry";
import chatRouter from "./chat";
import gsetRouter from "./gset";
import { formLimiter, chatLimiter } from "../middleware/rate-limit";

const router: IRouter = Router();

router.use(healthRouter);
router.use(formLimiter, enquiryRouter);
router.use(chatLimiter, chatRouter);
router.use(formLimiter, gsetRouter);

export default router;
