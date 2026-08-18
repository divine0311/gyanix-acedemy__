import { Router, type IRouter } from "express";
import healthRouter from "./health";
import enquiryRouter from "./enquiry";
import chatRouter from "./chat";
import gsetRouter from "./gset";

const router: IRouter = Router();

router.use(healthRouter);
router.use(enquiryRouter);
router.use(chatRouter);
router.use(gsetRouter);

export default router;
