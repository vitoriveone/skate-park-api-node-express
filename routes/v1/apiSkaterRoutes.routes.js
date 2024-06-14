import express from 'express';
import { putSkaterStatusUpdate, deleteSkaterDestroy, putSkaterUpdate } from '../../controllers/skatersHandlerController.js';


const router = express.Router();

router.put('/status', putSkaterStatusUpdate);
router.put('/', putSkaterUpdate);
router.delete('/', deleteSkaterDestroy);

export default router;