import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../dto/login-user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { AuthService } from '../services/auth.service';
import { LoginUserResponseDto } from '../dto/login-user-response.dto';

@ApiTags('Запросы для авторизации')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Авторизация для зарегестрированого пользователя' })
  @ApiResponse({ status: 200, type: LoginUserResponseDto })
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({ status: 200, type: LoginUserResponseDto })
  @Post('/registration')
  registration(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registration(registerUserDto);
  }
}
