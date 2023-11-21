import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('인증(auths)')
@Controller('auths')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Get()
  @UseGuards(AuthGuard('github'))
  async login() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async authCallback(@Req() req) {
    const content = {
      sub: req.user.email,
      nickname: req.user.nickname,
    };
    return { accessToken: this.jwtService.sign(content) };
  }
}
