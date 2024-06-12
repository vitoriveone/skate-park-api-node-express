import express from 'express';
import { getRootHome } from '../../controllers/homeViewController.js';

const router = express.Router();

router.get('/', getRootHome);

export default router;