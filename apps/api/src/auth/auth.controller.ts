import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
// guards
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard'
import { RefreshTokenGuard } from '../common/guards/refreshToke.guard'
// dtos
import { CreateUserDto } from '../common/dto/create-user.dto'
import { AuthDto } from '../common/dto/auth.dto'
// services
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto)
  }

  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data)
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout((req as any).user['sub'])
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = (req as any).user['sub']
    const refreshToken = (req as any).user['refreshToken']
    return this.authService.refreshTokens(userId, refreshToken)
  }
}
