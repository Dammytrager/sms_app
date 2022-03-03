import express from "express";

import MessageHandler from "./message-handler";
import ErrorHandler from "./error-handler";
import {authenticate} from "../middlewares/authenticate";
import {Validators} from "../middlewares/validators";

const router = express.Router();

router.post('/inbound/sms', authenticate, Validators.inbound, MessageHandler.inbound);
router.post('/outbound/sms', authenticate, Validators.outbound, MessageHandler.outbound);

router.use(ErrorHandler.notFound);
router.use(ErrorHandler.internalError);

export default router;