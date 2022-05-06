import app from 'express';
import calculator from './Calculator';

const router = app.Router();

router.use(`/calculate`, calculator);

export default router