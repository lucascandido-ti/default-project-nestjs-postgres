import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  get(): { [key: string]: string } {
    return { hello: 'world' };
  }
}
