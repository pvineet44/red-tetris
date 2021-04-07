import { Router } from 'express'
import { testApi } from './teest';

const router: Router = Router()

router.get("/test", testApi);


export default router;