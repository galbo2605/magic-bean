import { Controller, Get, Res } from '@nestjs/common';

import { Message } from '@magic-bean/api-interfaces';

import { AppService } from './app.service';
import { join } from 'path';
import { eDistPath } from './enum/dist-path.enum';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get('hello')
	getData(): Message {
		return this.appService.getData();
	}

	@Get()
	getSPA(@Res() response): string {
		return response.sendFile(join(__dirname, eDistPath.DistPath));
	}
}
