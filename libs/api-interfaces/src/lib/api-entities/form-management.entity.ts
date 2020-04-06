import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class FormManagementEntity {

	@ObjectIdColumn()
	UID: ObjectID;

	@Column()
	name: string = null;

	@Column()
	fields: any[] = null;

	@Column()
	editing?: boolean = null;

	@Column()
	removableFields?: boolean = null;

	@Column()
	mode?: 'Read' | 'Write' = null;

	@Column()
	subtitle?: string = null;

	@Column()
	buttonLabel?: string = null;

	@Column()
	buttonDisabled?: boolean = null;

	@Column()
	highlightField?: boolean = null;

	@Column()
	First_Created: Date = null;

	@Column()
	Last_Updated: Date = null;

}