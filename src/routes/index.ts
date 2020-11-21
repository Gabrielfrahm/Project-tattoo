import { Router } from 'express';
import artistRouter from './Artist.routes';
import adminSession from './SessionAdmin.routes';
import artistSession from './SessionArtist.routes';
import appointmentRouter from './Appointment.routes';
import workRouter from './Work.routes';

const routes = Router();

routes.use('/artist', artistRouter);
routes.use('/sessionAdmin', adminSession);
routes.use('/sessionArtist', artistSession);
routes.use('/appointments', appointmentRouter);
routes.use('/works', workRouter);

export default routes;
