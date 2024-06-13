import express from 'express';
import { getLoginView, putLoginAuth, putLogOut } from '../../controllers/loginHandlerController.js';

const router = express.Router();

router.get('/', getLoginView);
router.post('/', putLoginAuth);
router.post('/out', putLogOut);

export default router;