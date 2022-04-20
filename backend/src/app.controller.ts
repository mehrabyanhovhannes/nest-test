import { Controller, Get, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/registration')
  async registration(@Request() req, @Res() res) {
    const token = await this.authService.registration(req.body);
    if (!token) {
      return res.status(HttpStatus.BAD_REQUEST).json({message: "User already exists"});
    } 
    return res.status(HttpStatus.OK).json(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  async getAllUsers(@Request() req, @Res() res) {
    const users = await this.userService.getAll();
    if (!users) {
      return res.status(HttpStatus.BAD_REQUEST).json({message: "Users not found"});
    } 
    return res.status(HttpStatus.OK).json(users);
  }
}
