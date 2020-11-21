/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Artist from './Artist';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  client: string;

  @Column()
  client_email: string;

  @Column()
  artist_id: string;

  @ManyToOne(() => Artist)
  @JoinColumn({ name: 'artist_id' })
  provider: Artist;

  @Column('timestamp with time zone')
  date: Date;

  @Column()
  price: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
