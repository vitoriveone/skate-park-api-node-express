import express from 'express';
import { postSkaterCreate, putSkaterEdit, deleteSkaterDestroy, getSkaterFind,putSkaterStatusUpdate } from '../../controllers/skaterHandlerController.js';

const router = express.Router();

router.get('/', getSkaterFind);
router.post('/', postSkaterCreate);
router.put('/', putSkaterEdit);
router.delete('/', deleteSkaterDestroy);
router.put('/status', putSkaterStatusUpdate);


export default router;