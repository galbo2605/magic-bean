import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';

import { ListItemModule } from './list-item/list-item.module';
import { AppService } from './app.service';
import { ormConfig } from './db/typeorm.config';
import { AppController } from './app.controller';
import { eDistPath } from './enum/dist-path.enum';

@Module({
	imports: [
		TypeOrmModule.forRoot(ormConfig),
		ListItemModule,
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, eDistPath.DistPath),
		}),
	],
	controllers: [
		AppController,
	],
	providers: [
		AppService,
	],
})
export class AppModule { }
