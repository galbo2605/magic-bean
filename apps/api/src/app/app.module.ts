import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';

import { ListItemModule } from './list-item/list-item.module';
import { ormConfig } from './db/typeorm.config';
import { AppController } from './app.controller';
import { eDistPath } from './enum/dist-path.enum';
import { TestModule } from './test/test.module';
import { AmazonClothingItemModule } from './amazon-clothing-item/amazon-clothing-item.module';
import { AppSubscriber } from './subscribers/app.subscriber';

@Module({
	imports: [
		TypeOrmModule.forRoot(ormConfig),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, eDistPath.DistPath),
		}),
		ListItemModule,
		TestModule,
		AmazonClothingItemModule,
	],
	controllers: [
		AppController,
	],
	providers: [
		AppSubscriber,
	],
})
export class AppModule { }
