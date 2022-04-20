import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
  id: number;
	
  @Column('text')
	firstName: string;
	
  @Column('text')
	lastName: string;
	
  @Column('text')
	username: string;

  @Column('text')
  password: string;
}