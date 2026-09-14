import { Router, type IRouter } from "express";
import healthRouter from "./health";
import enquiryRouter from "./enquiry";
import chatRouter from "./chat";
import gsetRouter from "./gset";
import { enquiryLimiter, gsetLimiter, chatLimiter } from "../middleware/rate-limit";

const router: IRouter = Router();

router.use(healthRouter);
router.use(enquiryLimiter, enquiryRouter);
router.use(chatLimiter, chatRouter);
router.use(gsetLimiter, gsetRouter);

export default router;
