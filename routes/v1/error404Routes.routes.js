import express from 'express';
import { getRoot404} from '../../controllers/error404ViewController.js';

const router = express.Router();

router.get('/', getRoot404);

export default router;