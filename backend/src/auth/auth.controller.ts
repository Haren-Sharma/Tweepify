import { Body, Controller,Param,Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    generateEmailToken(){
        return (Math.trunc(Math.random()*999999)).toString();
    }
    /*
    Create a user,if it doesn't exsist,
    generate the email token and send it to their email
    */
    @Post('/login')
    login(@Body() body:{email:string}){
        return this.authService.login(body.email,this.generateEmailToken());
    }
    /*
    validate the email token,
    generate the jwt token
    */
    @Post('/authenticate/:userId')
    authenticate(@Body() body:{email:string,emailToken:string},@Param('userId') userId:string){
        return this.authService.authenticate(body.email,body.emailToken,userId);
    }
}
