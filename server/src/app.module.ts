import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { SearchModule } from './features/search/search.module';
import { RolesService } from './shared/core/services/roles.service';
import { FeaturesModule } from './features/feature.module';

@Module({
  imports: [
    SharedModule,
    FeaturesModule
 
  ],
  controllers: [],
  providers: [AppService,RolesService],
})
export class AppModule {}
