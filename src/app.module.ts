import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoryVerificationsModule } from './repository-verifications/repository-verifications.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
	imports: [RepositoryVerificationsModule, OrganizationsModule, MetricsModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
