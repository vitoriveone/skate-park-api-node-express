import express from 'express';
import { getRootSkaterEdit } from '../../controllers/skaterEditViewController.js';

const router = express.Router();

router.get('/', getRootSkaterEdit);

export default router;