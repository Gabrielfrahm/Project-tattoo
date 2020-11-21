/* eslint-disable camelcase */

import { getRepository } from 'typeorm';
import Work from '../models/Work';
import Artist from '../models/Artist';
import AppError from '../error/AppError';

interface Request {
  img: string;
  legend: string;
  artist_id: string;
}

class CreateWorkService {
  public async execute({ img, legend, artist_id }: Request): Promise<Work> {
    const worksRepository = getRepository(Work);
    const artistRepository = getRepository(Artist);

    const artist = await artistRepository.findOne(artist_id);

    if (!artist) {
      throw new AppError('only artist can change avatar', 401);
    }

    const works = worksRepository.create({
      img,
      legend,
      artist_id,
    });

    await worksRepository.save(works);

    return works;
  }
}

export default CreateWorkService;
