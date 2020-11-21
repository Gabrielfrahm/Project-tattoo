/* eslint-disable camelcase */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment';
import AppError from '../error/AppError';

interface Request {
  client: string;
  client_email: string;
  date: Date;
  price: string;
  artist_id: string;
}

class CreateAppointService {
  public async execute({
    client,
    client_email,
    date,
    price,
    artist_id,
  }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      client,
      client_email,
      date: appointmentDate,
      price,
      artist_id,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointService;
