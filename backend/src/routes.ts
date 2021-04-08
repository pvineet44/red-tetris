import { Router } from 'express'
import { testApi } from './teest';

const router: Router = Router()

router.get("/test", testApi);
router.get("/", testApi);


export default router;