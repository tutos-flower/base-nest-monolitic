import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RolesService } from '@root/shared/core/services/roles.service';
import { SharedModule } from '@root/shared/shared.module';
import { SearchModule } from './search/search.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    SearchModule,
    SharedModule,
  ],
  providers: [RolesService],
  exports: [RolesService],
})
export class FeaturesModule {}
