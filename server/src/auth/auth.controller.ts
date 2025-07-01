import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any) {
    return {
      data: req.user,
      success: true,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  logout(@Request() req) {
    return req.logout();
  }
}
