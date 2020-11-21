import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateAdminService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { admin, token } = await authenticateUser.execute({ email, password });

  delete admin.password;

  return response.json({ admin, token });
});
export default sessionsRouter;
