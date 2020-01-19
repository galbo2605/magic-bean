import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { FormManagementService } from './services/form-management.service';
import { FormManagementEntity } from '@magic-bean/api-interfaces';
interface IResponseWithCount {
	records: FormManagementEntity[];
	count: number;
};

@Controller('form-management')
export class FormManagementController {
	constructor(private FormManagementSVC: FormManagementService) { }

	@Get('findAll')
	async findAll(
		@Query('column') column: string,
		@Query('direction') direction: 'asc' | 'desc',
		@Query('page') page: number,
		@Query('pageSize') pageSize: number,
		@Query('search') search: string,
	): Promise<IResponseWithCount> {
		const [FormManagements, count] = await this.FormManagementSVC.findAll(column, direction, page, pageSize, search);
		return { records: FormManagements, count };
	}

	@Post('createOne')
	async createOne(@Body() body: any): Promise<FormManagementEntity> {
		try {
			const FormManagement = await this.FormManagementSVC.create(body);
			return FormManagement;
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	@Post('updateOne')
	async updateOne(@Body() body: any): Promise<any> {
		const message = await this.FormManagementSVC.update(body);
		return { message };
	}

	@Post('deleteOne')
	async deleteOne(@Body() body: any): Promise<any> {
		const message = await this.FormManagementSVC.delete(body.UID);
		return { message };
	}
}
