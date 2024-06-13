import express from 'express';
import { putSkaterStatusUpdate, deleteSkaterDestroy } from '../../controllers/skatersHandlerController.js';


const router = express.Router();

router.put('/status', putSkaterStatusUpdate);
//router.delete('/', deleteSkaterDestroy);

export default router;