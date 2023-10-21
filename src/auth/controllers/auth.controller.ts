import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../dto/login-user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('Запросы авторизации')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/login")
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto)
    }

    @Post("/registration")
    registration(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.registration(registerUserDto)
    }
}
