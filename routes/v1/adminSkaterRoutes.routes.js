import express from 'express';
import { getSkaterAdminEdit } from '../../controllers/skatersViewController.js';


const router = express.Router();

router.get('/edit',getSkaterAdminEdit );

export default router;