import { Router } from 'express';
import { registorUsers } from '../controllars/User.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
const router = Router();

router.route('/register').post(
  upload.fields([
    {
      name: 'avatar',
      maxCount: 1,
    },
    {
      name: 'coveImage',
      maxCount: 1,
    },
  ]),
  registorUsers
);

export default router;
