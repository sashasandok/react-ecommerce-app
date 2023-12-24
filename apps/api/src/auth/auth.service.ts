import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common'
import { UserService } from 'src/users/user.service'
import * as bcrypt from 'bcrypt'
// dtos
import { CreateUserDto } from '../common/dto/create-user.dto'
import { AuthDto } from '../common/dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async signUp(createUserDto: CreateUserDto): Promise<any> {
    // Check if user exists
    const userExists = await this.userService.findByUsername(createUserDto.name)
    if (userExists) {
      throw new BadRequestException('User already exists')
    }

    // Hash password
    const hash = await bcrypt.hash(createUserDto.password, 10)
    const newUser = await this.userService.create({
      ...createUserDto,
      password: hash,
    })

    return { status: 200, user: newUser }
  }

  async signIn(data: AuthDto, session: any) {
    // Check if user exists
    const user = await this.userService.findByUsername(data.email)
    if (!user) throw new BadRequestException('User does not exist')
    const passwordMatches = await bcrypt.compare(data.password, user.password)
    if (!passwordMatches) throw new BadRequestException('Password is incorrect')

    session.authenticated = true

    session.save()

    return {
      status: 200,
      data: user,
      message: `Hello ${user.name}! Welcome to platform`,
    }
  }

  async logout(session: any) {
    session.destroy()
    return { msg: 'The user session has ended', status: 200 }
  }

  async verifyUser(email: string, password: string) {
    const user = await this.userService.findByUsername(email)
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!user) {
      throw new NotAcceptableException('Could not find the user')
    }
    if (user && passwordValid) {
      return {
        id: user.id,
        name: user.name,
      }
    }
    return null
  }
}
