import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column('text', { array: true })
  properties: string[];

  @Column()
  likes: number;
}
