import { Injectable } from '@nestjs/common';
import { RepositoryVerification } from './entities/repository-verifications.entity';
import { RepositoryVerificationsRepository } from './repository-verifications.repository';

@Injectable()
export class RepositoryVerificationsService {
	constructor(
		private readonly repositoryVerificationsRepository: RepositoryVerificationsRepository,
	) {}

	async list(): Promise<{ repositories: RepositoryVerification[] }> {
		const repositoryVerifications =
			await this.repositoryVerificationsRepository.list();

		return {
			repositories: repositoryVerifications,
		};
	}
}
