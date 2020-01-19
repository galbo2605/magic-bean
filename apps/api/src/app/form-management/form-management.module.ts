import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormManagementEntity } from '@magic-bean/api-interfaces';
import { FormManagementService } from './services/form-management.service';
import { FormManagementController } from './form-management.controller';
import { FormManagementSubscriber } from './subscribers/form-management.subscriber';

@Module({
	imports: [
		TypeOrmModule.forFeature([FormManagementEntity])
	],
	controllers: [
		FormManagementController
	],
	providers: [
		FormManagementService,
		FormManagementSubscriber
	],
})
export class FormManagementModule { }
