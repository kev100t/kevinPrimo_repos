import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { StateEnum } from './enums/state.enum';
import { VerificationEnum } from './enums/verification.enum';
import { RepositoryEntity } from './entities/repository.entity';
import { RepositoriesRepository } from './repositories.repository';

@Injectable()
export class RepositoriesService {
	constructor(
		private readonly repositoriesRepository: RepositoriesRepository,
	) {}

	async list(tribeId: string): Promise<{ repositories: RepositoryEntity[] }> {
		const tribeData = await this.repositoriesRepository.getTribe(tribeId);

		if (!tribeData) {
			throw new HttpException(
				{
					message: 'La Tribu no se encuentra registrada',
				},
				HttpStatus.BAD_REQUEST,
			);
		}

		const repositories = await this.repositoriesRepository.list(tribeId);

		const repositoryVerficiationData =
			await this.repositoriesRepository.listRepositoryVerifications();

		if (repositories.length === 0) {
			throw new HttpException(
				{
					message:
						'La Tribu no tiene repositorios que cumplan con la cobertura necesaria',
				},
				HttpStatus.BAD_REQUEST,
			);
		}

		for (const repository of repositories) {
			const metric = repository.metrics[0];

			const repositoryVerificationCode =
				repositoryVerficiationData.repositories.find(
					(repositoryVerification) =>
						repositoryVerification.id === repository.id,
				);

			repository.name = repository.name.trim();
			repository.organization = repository.tribe.organization.name.trim();
			repository.tribe = repository.tribe.name.trim();
			repository.coverage = `${metric.coverage}%`;
			repository.codeSmells = metric.codeSmells;
			repository.bugs = metric.bugs;
			repository.vulnerabilities = metric.vulnerabilities;
			repository.hotspot = metric.hotspot;
			repository.state = StateEnum[repository.state];
			repository.verificationState = '';

			switch (repositoryVerificationCode.state) {
				case 604:
					repository.verificationState = VerificationEnum.VERIFIED;
					break;
				case 605:
					repository.verificationState = VerificationEnum.ON_HOLD;
					break;
				case 606:
					repository.verificationState = VerificationEnum.APPROVED;
					break;
			}

			delete repository.tribeId;
			delete repository.createTime;
			delete repository.metrics;
			delete repository.status;
		}

		return {
			repositories: repositories,
		};
	}

	async getReportFile(tribeId: string): Promise<any> {
		const { repositories } = await this.list(tribeId);

		let csvData =
			[
				'ID',
				'Name',
				'Tribe',
				'Organization',
				'Coverage',
				'Code Smells',
				'Bugs',
				'Vulnerabilities',
				'Hotspot',
				'Verification State',
				'State',
			].join(',') + '\r\n';

		repositories.forEach((repository) => {
			csvData +=
				[
					repository.id,
					repository.name,
					repository.tribe,
					repository.organization,
					repository.coverage,
					repository.codeSmells,
					repository.bugs,
					repository.vulnerabilities,
					repository.hotspot,
					repository.verificationState,
					repository.state,
				].join(',') + '\r\n';
		});

		return csvData;
	}
}
