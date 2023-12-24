import { Body, Controller, Get, Post, Request, UnauthorizedException } from '@nestjs/common'
// dtos
import { CreateUserDto } from '../common/dto/create-user.dto'
// services
import { AuthService } from './auth.service'
import { AuthDto } from 'src/common/dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signUp(createUserDto)
  }

  @Post('signin')
  signin(@Body() authDto: AuthDto, @Request() req: any) {
    return this.authService.signIn(authDto, req.session)
  }

  @Get('logout')
  async logout(@Request() req) {
    return await this.authService.logout(req.session)
  }

  @Get('getme')
  async getMe(@Request() req) {
    return req.session.authenticated
      ? { authenticated: req.session.authenticated }
      : new UnauthorizedException()
  }
}
