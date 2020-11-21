import { Router } from 'express';
import AuthenticateArtistService from '../services/AuthenticateArtistService';

const sessionsArtistRouter = Router();

sessionsArtistRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateArtist = new AuthenticateArtistService();

  const { artist, token } = await authenticateArtist.execute({
    email,
    password,
  });

  // delete artist.password;

  return response.json({ artist, token });
});
export default sessionsArtistRouter;
