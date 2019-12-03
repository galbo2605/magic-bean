import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

export const ormConfig: TypeOrmModuleOptions = {
	type: 'mongodb',
	host: 'localhost',
	port: 27017,
	username: '',
	password: '',
	database: 'local',
	entities: getMetadataArgsStorage().tables.map(tbls => tbls.target)
};