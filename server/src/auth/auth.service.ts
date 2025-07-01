import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  validateUser(email: string, password: string) {
    const user = this.usersService.findOne(email, password);
    if (user) {
      return user;
    }
    return null;
  }
}
