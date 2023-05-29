import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/dtos/User.dto';
import { UserEntity } from 'src/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) {}

    // The login function
    async signIn(email:string, password: string) {
        
        const user = await this.userRepository.findOne({
            where: { email: email }
        });

        const isPasswordMatch = await bcrypt.compare(password,user?.password);

        if (isPasswordMatch == false ) {
            throw new UnauthorizedException();
        }
    
        const payload = { email: user.email, sub: user.id };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }


    // The signup function
    async signUp(userDto: UserDto) {
        const user = await this.userRepository.findOne({
            where: { email: userDto.email }
        });


        if (user != null)
            return null;
        
        const hash = await bcrypt.hash(userDto.password, 10);
        userDto.password = hash;

        return await this.userRepository.save(userDto);
    }
    
}
