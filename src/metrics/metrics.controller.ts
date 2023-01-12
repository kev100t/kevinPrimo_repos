import {
	Controller,
	HttpException,
	HttpStatus,
	UseFilters,
	Get,
	Param,
} from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { HttpExceptionFilter } from '../http-exception.filter';

@Controller('metrics')
export class MetricsController {
	constructor(private readonly metricsService: MetricsService) {}

	@Get(':tribeId')
	@UseFilters(new HttpExceptionFilter())
	async list(@Param() params): Promise<any> {
		try {
			const { tribeId } = params;

			return await this.metricsService.list(tribeId);
		} catch (err) {
			throw new HttpException(
				{
					message: err.message,
				},
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
