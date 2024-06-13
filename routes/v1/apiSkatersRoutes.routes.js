import express from 'express';
import { getSkatersAll } from '../../controllers/skaterHandlerController.js';

const router = express.Router();

router.get('/', getSkatersAll);

export default router;