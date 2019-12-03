import { Controller, Get, Res } from '@nestjs/common';


import { join } from 'path';
import { eDistPath } from './enum/dist-path.enum';

@Controller()
export class AppController {
	@Get()
	getSPA(@Res() response): string {
		return response.sendFile(join(__dirname, eDistPath.DistPath));
	}
}
