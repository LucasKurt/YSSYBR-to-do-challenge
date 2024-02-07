import { randomUUID } from 'node:crypto';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  finished: boolean;

  @BeforeInsert()
  generatedId() {
    if (this.id) return;
    this.id = randomUUID();
  }
}
