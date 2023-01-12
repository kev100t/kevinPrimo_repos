import {
	Controller,
	HttpException,
	HttpStatus,
	UseFilters,
	Get,
} from '@nestjs/common';
import { RepositoryVerificationsService } from './repository-verifications.service';
import { HttpExceptionFilter } from '../http-exception.filter';
import { RepositoryVerification } from './entities/repository-verifications.entity';

@Controller('repository-verifications')
export class RepositoryVerificationsController {
	constructor(
		private readonly repositoryVerificationsService: RepositoryVerificationsService,
	) {}

	@Get()
	@UseFilters(new HttpExceptionFilter())
	async list(): Promise<{ repositories: RepositoryVerification[] }> {
		try {
			return await this.repositoryVerificationsService.list();
		} catch (error) {
			throw new HttpException(
				{
					message: 'Ocurrió un error.',
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
