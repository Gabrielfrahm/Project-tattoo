import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from '../error/AppError';

import authConfig from '../config/auth';

import Artist from '../models/Artist';

interface Request {
  email: string;
  password: string;
}

interface Response {
  artist: Artist;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const artistRepository = getRepository(Artist);

    const artist = await artistRepository.findOne({ where: { email } });

    if (!artist) {
      throw new AppError('Incorrect email/password combination');
    }

    const passwordMatted = await compare(password, artist.password);

    if (!passwordMatted) {
      throw new AppError('Incorrect email/password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: artist.id,
      expiresIn,
    });
    return { artist, token };
  }
}

export default AuthenticateUserService;
