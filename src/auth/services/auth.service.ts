import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from '../dto/login-user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { UserService } from 'src/users/services/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcryptjs"
import { UserModel } from 'src/users/models/users.model';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    private async generateToken(user: UserModel) {
        const payload = {
            id: user.id,
            email: user.email,
            roles: user.roles
        }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: LoginUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)

        if (!user) {
            throw new UnauthorizedException({ message: "Пользователь с таким email не найден" })
        }

        const isPasswrdsEqual = await bcrypt.compare(userDto.password, user.password)

        if (isPasswrdsEqual) {
            return user
        }
        throw new UnauthorizedException({ message: "Некорректный email или пароль" })
    }

    async login(loginUserDto: LoginUserDto) {
        const user = await this.validateUser(loginUserDto)
        return this.generateToken(user)
    }

    async registration(registerUserDto: RegisterUserDto) {
        const candidate = await this.userService.getUserByEmail(registerUserDto.email)

        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(registerUserDto.password, 5)
        const user = await this.userService.createUser({
            ...registerUserDto,
            password: hashPassword
        })
        const token = await this.generateToken(user)
        
        return token
    }
}
