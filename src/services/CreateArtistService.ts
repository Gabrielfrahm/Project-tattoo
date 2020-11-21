import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../error/AppError';

import Artist from '../models/Artist';

interface Request {
  name: string;
  email: string;
  password: string;
  number: string;
}

class CreateArtistService {
  public async execute({
    name,
    email,
    password,
    number,
  }: Request): Promise<Artist> {
    const artistRepository = getRepository(Artist);

    const checkArtistExist = await artistRepository.findOne({
      where: { email },
    });

    if (checkArtistExist) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const artist = artistRepository.create({
      name,
      email,
      password: hashedPassword,
      number,
    });

    await artistRepository.save(artist);

    return artist;
  }
}

export default CreateArtistService;
