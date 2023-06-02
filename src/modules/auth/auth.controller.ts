import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserDto } from 'src/dtos/User.dto';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dtos/Login.dto';
import { SkipAuth } from 'src/decorators/SkipAuth.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {}

    @SkipAuth()
    @Post("/login")
    signIn(@Body() loginDto:LoginDto ) {
        return this.authService.signIn(loginDto.email, loginDto.password, loginDto.asLandlord);
    }

    @SkipAuth()
    @Post("/signup")
    async signUP(@Body() user: UserDto) {
        const response = await this.authService.signUp(user);

        if (response)
            return response;
        
        throw new HttpException("It seem like an error occur in server, or this email already exist", HttpStatus.INTERNAL_SERVER_ERROR);
        
    }
}
