import express from 'express';
import { getSkatersAdmin} from '../../controllers/skatersViewController.js';


const router = express.Router();

router.get('/', getSkatersAdmin);


export default router;