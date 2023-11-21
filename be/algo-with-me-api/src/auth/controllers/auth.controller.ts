import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('인증(auths)')
@Controller('auths')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Get('github')
  @ApiOperation({
    summary: 'github 로그인/회원가입',
    description: 'github 로그인/회원가입 api 입니다.',
  })
  @UseGuards(AuthGuard('github'))
  async login() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  @ApiOperation({
    summary: '깃허브 인증 완료시 리다이렉트 되는 api',
    description: '깃허브 인증이 완료되면 리다이렉트 되는 api 입니다. accessToken을 반환합니다.',
  })
  async authCallback(@Req() req) {
    const content = {
      sub: req.user.email,
      nickname: req.user.nickname,
    };
    return { accessToken: this.jwtService.sign(content) };
  }

  // 인증 테스트 api
  @Get('/tests')
  @UseGuards(AuthGuard('jwt'))
  test(@Req() req) {
    return req.user;
  }
}
