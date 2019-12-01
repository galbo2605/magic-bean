/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import * as bodyParser from 'body-parser';
async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
	const globalPrefix = 'api';
	app.setGlobalPrefix(globalPrefix);
	app.use(bodyParser.json({limit: '500mb'}));
	app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
	const port = process.env.port || 3333;
	await app.listen(port, () => {
		console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
	});
}

bootstrap();
