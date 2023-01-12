import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();

		const messageResponse: any = exception.getResponse();

		const jsonResponse = messageResponse.message
			? {
					message: messageResponse.message,
			  }
			: exception.getResponse();

		response.status(status).json(jsonResponse);
	}
}
