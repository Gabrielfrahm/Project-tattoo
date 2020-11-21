import { Router } from 'express';
// import multer from 'multer';
import { getRepository } from 'typeorm';
import CreateArtistService from '../services/CreateArtistService';

import Artist from '../models/Artist';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const artistRouter = Router();

artistRouter.use(ensureAuthenticated);

artistRouter.get('/', async (req, res) => {
  const artists = getRepository(Artist);
  const artist = await artists.find();
  return res.json(artist);
});

artistRouter.post('/', async (req, res) => {
  const { name, email, password, number } = req.body;

  const createArtist = new CreateArtistService();

  const artist = await createArtist.execute({ name, email, password, number });

  // delete artist.password;

  return res.json(artist);
});

export default artistRouter;
