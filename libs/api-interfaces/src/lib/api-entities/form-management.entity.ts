import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class FormManagementEntity {

	@ObjectIdColumn()
	UID: ObjectID;

	@Column()
	FormName: string = null;

	@Column()
	First_Created: Date = null;

	@Column()
	Last_Updated: Date = null;

}
