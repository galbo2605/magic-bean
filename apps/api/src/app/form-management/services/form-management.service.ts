import { Injectable } from '@nestjs/common';
import { FormManagementEntity, IFormManagement } from '@magic-bean/api-interfaces';
import { MongoRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FormManagementService {
	constructor(
		@InjectRepository(FormManagementEntity)
		private readonly FormManagementRepository: MongoRepository<FormManagementEntity>,
	) { }
	getCols() {
		const cols: { id: string, name: string }[] = [];
		const keys = Object.getOwnPropertyNames(new FormManagementEntity());
		keys.forEach(key => {
			const id = key;
			const name = key.split('_').join(' ');
			cols.push({ id, name });
		});
		return cols;
	}

	async findAll(column: string = 'Created_At', direction: 'asc' | 'desc' = 'desc', page: number = 0, pageSize: number = 5, search: string = ''): Promise<[FormManagementEntity[], number]> {
		const cols = this.getCols();
		const $or = cols.reduce((acc, item) => {
			acc.push({ [item.id]: { $regex: search } });
			return acc;
		}, []);
		return await this.FormManagementRepository.findAndCount({
			order: {
				[column]: direction.toLocaleUpperCase(),
			},
			take: +pageSize,
			skip: page * pageSize,
			where: {
				$or
			},
		});
	}

	async findByDates(fromDate: Date, toDate: Date): Promise<FormManagementEntity[]> {
		return await this.FormManagementRepository.find({
			where: {
				First_Created: {
					$gte: new Date(fromDate),
					$lt: new Date(toDate)
				}
			}
		})
	}

	async save(FormManagement: IFormManagement): Promise<FormManagementEntity> {
		try {
			const foundOne = await this.FormManagementRepository.findOne({
				name: FormManagement.name
			});
			if (foundOne) {
				return await this.FormManagementRepository.save({ ...foundOne, ...FormManagement });
			} else {
				return await this.FormManagementRepository.save(FormManagement);
			}
		} catch (error) {
			throw error;
		}
	}

	async delete(uid: string): Promise<string> {
		const itemToDelete = await this.FormManagementRepository.findOne(uid);
		const deletedChildren = this.FormManagementRepository.deleteMany({
			$and: [
				{ name: itemToDelete.name }
			]
		});
		const deletedParent = this.FormManagementRepository.remove(itemToDelete);
		await Promise.all([deletedParent, deletedChildren])
		return 'success';
	}

}
