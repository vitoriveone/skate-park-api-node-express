import express from 'express';
import { getRegisterView, postRegisterSkater } from '../../controllers/registerHandlerController.js';

const router = express.Router();

router.get('/', getRegisterView);
router.post('/', postRegisterSkater);

export default router;