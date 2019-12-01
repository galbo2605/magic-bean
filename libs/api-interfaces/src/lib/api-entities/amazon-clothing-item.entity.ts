import { Entity, Column, ObjectIdColumn, ObjectID, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity()
export class AmazonClothingItemEntity {

	@ObjectIdColumn()
	UID: ObjectID;

	@Column({ length: 99 })
	SKU: string = null;

	@Column({ length: 200 })
	Title: string = null;

	@Column({ length: 200 })
	Brand: string = null;

	@Column({ length: 1000 })
	Description: string = null;

	@Column({ length: 1000 })
	Item_Type: string = null;

	@Column({ length: 9999 })
	Price: number = null;

	@Column({ length: 90 })
	Days_Till_Ready: number = null;

	@Column({ length: 100 })
	Quantity: string = null;

	@Column({ length: 500 })
	Bullet_Point_1: string = null;

	@Column({ length: 500 })
	Bullet_Point_2: string = null;

	@Column({ length: 500 })
	Bullet_Point_3: string = null;

	@Column({ length: 500 })
	Bullet_Point_4: string = null;

	@Column({ length: 500 })
	Bullet_Point_5: string = null;

	@Column({ length: 500 })
	Bullet_Point_6: string = null;

	@Column({ length: 500 })
	Bullet_Point_7: string = null;

	@Column({ length: 500 })
	Keywords: string = null;

	@Column()
	Main_Image: string = null;

	@Column()
	Image2: string = null;

	@Column()
	Image3: string = null;

	@Column()
	Image4: string = null;

	@Column()
	Parent_Child: string = null;

	@Column()
	Parent_SKU: string = null;

	@Column()
	Relationship: string = null;

	@Column()
	Variation_Theme: string = null;

	@Column()
	Color: string = null;

	@Column()
	Color_Map: string = null;

	@Column()
	Department: string = null;

	@Column()
	Fabric_Type: string = null;

	@Column()
	Size: string = null;

	@Column()
	Size_Map: string = null;

	@Column()
	Shipping_Template: string = null;

	@Column()
	First_Created: Date = null;

	@Column()
	Last_Updated: Date = null;

	@BeforeInsert()
	setDefaultValue() {
		this.First_Created = new Date();
	}

	@BeforeUpdate()
	updateDefaultValues() {
		this.Last_Updated = new Date();
	}
}
