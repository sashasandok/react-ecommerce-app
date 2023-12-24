import { PassportSerializer } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void) {
    return done(null, user)
  }

  deserializeUser(payload: any, done: (err: Error, payload: any) => void) {
    return done(null, payload)
  }
}
