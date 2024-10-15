import { Router } from "express";
import asyncMiddleware from "../middleware/index.js";
import Person from "../../controllers/person.js";

const router = Router();
const controller = new Person();

router.post('/person', asyncMiddleware(controller.create));

export default router;
