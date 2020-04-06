import { Controller, Get, Res } from '@nestjs/common';

import { TestService } from './test.service';

@Controller()
export class TestController {
	constructor(private readonly testService: TestService) { }

	@Get('cols')
	getCols(): any[] {
		return this.testService.getAmazonCols();
	}
	
	@Get('form-cols')
	getFormCols(): any[] {
		return this.testService.getFormCols();
	}
}
