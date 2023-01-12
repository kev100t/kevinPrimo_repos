import { Injectable } from '@nestjs/common';
import { RepositoryVerificationEntity } from './entities/repository-verification.entity';

@Injectable()
export class RepositoryVerificationsRepository {
	async list(): Promise<RepositoryVerificationEntity[]> {
		return [
			{
				id: '1',
				state: 604,
			},
			{
				id: '2',
				state: 605,
			},
			{
				id: '3',
				state: 606,
			},
		];
	}
}
