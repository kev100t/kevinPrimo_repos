import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryVerificationsController } from './repository-verifications.controller';
import { RepositoryVerificationsRepository } from './repository-verifications.repository';
import { RepositoryVerificationsService } from './repository-verifications.service';

describe('AppController', () => {
	let repositoryVerificationsController: RepositoryVerificationsController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [RepositoryVerificationsController],
			providers: [
				RepositoryVerificationsService,
				RepositoryVerificationsRepository,
			],
		}).compile();

		repositoryVerificationsController =
			app.get<RepositoryVerificationsController>(
				RepositoryVerificationsController,
			);
	});

	describe('list', () => {
		it('should return mock data repository verifications', async () => {
			const result = [
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

			const data = await repositoryVerificationsController.list();

			expect(JSON.stringify(data.repositories)).toBe(JSON.stringify(result));
		});
	});
});
