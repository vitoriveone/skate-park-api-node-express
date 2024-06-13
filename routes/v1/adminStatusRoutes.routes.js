import express from 'express';
import { getRootAdminStatus } from '../../controllers/statusViewController.js';

const router = express.Router();

router.get('/', getRootAdminStatus);

export default router;