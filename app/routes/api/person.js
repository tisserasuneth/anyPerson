import { Router } from "express";
import asyncMiddleware from "../middleware/index.js";
import Person from "../../controllers/person.js";

const router = Router();
const controller = new Person();

router.post('/person', asyncMiddleware(controller.create));
router.get('/person/:id', asyncMiddleware(controller.getCharacterById));
router.get('/person/:id/image', asyncMiddleware(controller.getImageById));
router.delete('/person/:id', asyncMiddleware(controller.delete));

export default router;
