import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entyties/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async registration(user: User) {
    const {
      username,
      password
    } = user;
    const isUserExists = await this.usersService.findOne(username);

    if (isUserExists) {
      return null;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.createUser({...user, password: passwordHash});
    return this.login(newUser);
  }

  async login(user: any) {
		const { password, ...jwtUser } = user;
    const payload = jwtUser;
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
