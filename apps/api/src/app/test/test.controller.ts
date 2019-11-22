import { Controller, Get, Res } from '@nestjs/common';

import { TestService } from './test.service';

@Controller()
export class TestController {
	constructor(private readonly testService: TestService) { }

	@Get('cols')
	getCols(): any[] {
		return this.testService.getCols();
	}
	
	@Get('data')
	getData(): any[] {
		return this.testService.getData();
	}
}
