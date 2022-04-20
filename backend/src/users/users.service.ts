import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/entyties/user.entity'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findOne(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.find({ select: ['firstName', 'lastName', 'username', 'id'] });
  }

  async createUser(user: User): Promise<User> {
    const newUser = this.userRepository.create({
      ...user
    });

    return await this.userRepository.save(newUser);
  }
}
