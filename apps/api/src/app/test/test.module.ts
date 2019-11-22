import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItemEntity } from '@magic-bean/api-interfaces';
import { TestService } from './test.service';
import { TestController } from './test.controller';

@Module({
	imports: [
		TypeOrmModule.forFeature([TodoItemEntity])
	],
	controllers: [
		TestController,
	],
	providers: [
		TestService,
	],
})
export class TestModule { }
