/* eslint-disable camelcase */
import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';
import CreateWorkService from '../services/CreateWorkService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/uploads';
import Work from '../models/Work';

const upload = multer(uploadConfig);
const workRoutes = Router();
workRoutes.get('/', async (req, res) => {
  const workRepository = getRepository(Work);
  const works = await workRepository.find();
  return res.json(works);
});

workRoutes.post(
  '/',
  ensureAuthenticated,
  upload.single('img'),
  async (req, res) => {
    const { legend, artist_id } = req.body;
    const createWork = new CreateWorkService();

    const works = createWork.execute({
      img: req.file.filename,
      legend,
      artist_id,
    });

    return res.json(works);
  },
);

export default workRoutes;
