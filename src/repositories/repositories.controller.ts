import {
	Controller,
	HttpException,
	HttpStatus,
	UseFilters,
	Get,
	Param,
	Res,
} from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { HttpExceptionFilter } from '../http-exception.filter';
import { RepositoryEntity } from './entities/repository.entity';
import type { Response } from 'express';

@Controller('repositories')
export class RepositoriesController {
	constructor(private readonly repositoriesService: RepositoriesService) {}

	@Get(':tribeId')
	@UseFilters(new HttpExceptionFilter())
	async list(@Param() params): Promise<{ repositories: RepositoryEntity[] }> {
		try {
			const { tribeId } = params;

			return await this.repositoriesService.list(tribeId);
		} catch {
			throw new HttpException(
				{
					message: 'Ocurrió un error.',
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	@Get(':tribeId/report-file')
	@UseFilters(new HttpExceptionFilter())
	async getReportFile(
		@Param() params,
		@Res({ passthrough: true }) res: Response,
	): Promise<any> {
		try {
			const { tribeId } = params;

			const fileName = 'report.csv';

			const data = await this.repositoriesService.getReportFile(tribeId);

			res
				.set({
					'Content-Type': 'text/csv',
					'Content-Disposition': `attachment; filename=${fileName}`,
				})
				.send(data);
		} catch {
			throw new HttpException(
				{
					message: 'Ocurrió un error.',
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
