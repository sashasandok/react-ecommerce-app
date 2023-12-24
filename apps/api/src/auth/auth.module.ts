import { Module } from '@nestjs/common'
import { LocalStrategy } from 'src/common/strategies/local.strategy'
import { PassportModule } from '@nestjs/passport'
import { SessionSerializer } from 'src/common/session.serializer'
import { UserModule } from 'src/users/user.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
