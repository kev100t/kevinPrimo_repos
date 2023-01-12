import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoryVerificationsModule } from './repository-verifications/repository-verifications.module';

@Module({
	imports: [RepositoryVerificationsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
