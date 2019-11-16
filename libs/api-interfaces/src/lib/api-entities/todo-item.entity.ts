import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class TodoItemEntity {
	@ObjectIdColumn()
	id: ObjectID;

	@Column()
	checked: boolean;

	@Column()
	mode: string;

	@Column({ length: 100 })
	value: string;
}
