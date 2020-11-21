import { getRepository } from 'typeorm';
// import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../error/AppError';

import Admin from '../models/Admin';

interface Request {
  email: string;
  password: string;
}

interface Response {
  admin: Admin;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const adminRepository = getRepository(Admin);

    const admin = await adminRepository.findOne({ where: { email } });

    if (!admin) {
      throw new AppError('Incorrect email/password combination');
    }

    // const passwordMathed = await compare(password, admin.password);
    const pass = await adminRepository.findOne({ where: { password } });

    if (!pass) {
      throw new AppError('Incorrect email/password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: admin.id,
      expiresIn,
    });
    return { admin, token };
  }
}

export default AuthenticateUserService;
