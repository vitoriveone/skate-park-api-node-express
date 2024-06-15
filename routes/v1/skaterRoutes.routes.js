import express from 'express';
import { getSkaterHome } from '../../controllers/skatersViewController.js';

const router = express.Router();

router.get('/', getSkaterHome);

export default router;