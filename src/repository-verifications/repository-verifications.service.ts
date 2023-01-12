import { Injectable } from '@nestjs/common';
import { RepositoryVerificationsRepository } from './repository-verifications.repository';

@Injectable()
export class RepositoryVerificationsService {
	constructor(
		private readonly repositoryVerificationsRepository: RepositoryVerificationsRepository,
	) {}

	async list(): Promise<any> {
		const repositoryVerifications =
			await this.repositoryVerificationsRepository.list();

		return {
			repositories: repositoryVerifications,
		};
	}
}
