/* eslint-disable camelcase */
import {
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Artist from './Artist';

@Entity('works')
class Work {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  artist_id: string;

  @Column()
  img: string;

  @ManyToOne(() => Artist)
  @JoinColumn({ name: 'artist_id' })
  provider: Artist;

  @Column()
  legend: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Work;
