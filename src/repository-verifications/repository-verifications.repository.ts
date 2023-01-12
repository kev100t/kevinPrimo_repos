import { Injectable } from '@nestjs/common';
import { RepositoryVerification } from './entities/repository-verifications.entity';

@Injectable()
export class RepositoryVerificationsRepository {
	async list(): Promise<RepositoryVerification[]> {
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
