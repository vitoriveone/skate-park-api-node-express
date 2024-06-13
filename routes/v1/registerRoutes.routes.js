import express from 'express';
import { getRootRegister} from '../../controllers/registerViewController.js';

const router = express.Router();

router.get('/', getRootRegister);

export default router;