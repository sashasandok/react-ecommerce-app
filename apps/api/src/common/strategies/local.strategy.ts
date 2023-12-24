import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    })
  }

  validate(email: string, password: string): any {
    const user = this.authService.verifyUser(email, password)
    if (!user) throw new UnauthorizedException('Incorrect user email or password')
    return user
  }
}
