import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('인증(auths)')
@Controller('auths')
export class AuthController {
  constructor() {}

  @Get()
  @UseGuards(AuthGuard('github'))
  async login() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async authCallback(@Req() req) {
    return req.user;
  }
}
