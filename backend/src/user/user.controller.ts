import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
    /*
    create
    get one
    list
    update
    delete
    */
   @Post()
   createUser(@Body() body:CreateUserDto){
    
   }
}
