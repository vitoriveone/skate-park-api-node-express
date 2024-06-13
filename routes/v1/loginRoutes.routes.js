import express from 'express';
import { getRootLogin} from '../../controllers/loginViewController.js';

const router = express.Router();

router.get('/', getRootLogin);

export default router;