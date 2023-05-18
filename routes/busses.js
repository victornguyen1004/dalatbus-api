import express from "express";
const router = express.Router();
import { busController } from "../controllers/index.js";

router.get("/", busController.getAllBusses);
router.get("/id/:id", busController.getBusById);
router.get("/route/:slug", busController.getBusBySlug);
router.post("/", busController.insertBus);
router.post("/insert-multiple", busController.insertMultipleBusses);
router.delete("/", busController.deleteBus);
router.delete("/delete-all", busController.deleteAllBusses);
router.patch("/", busController.updateBus);

export default router;
