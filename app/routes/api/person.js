import { Router } from "express";
import asyncMiddleware from "../middleware";
import Person from "../../controllers/person";

const router = Router();
const controller = new Person();

router.post('/person', asyncMiddleware(controller.create));

export default router;
