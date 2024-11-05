import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@root/features/user/entities/user.entity';
import { envs } from '@root/shared/config';
import { Permission } from '@root/shared/core/entities/permission.entity';
import { Role } from '@root/shared/core/entities/roles.entity';

// import { ElasticsearchService } from '../elastisc/elasticsearch.service';
// import { KibanaService } from '../elastisc/kibana.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envs.DATABASE_HOST,
      port: envs.DATABASE_PORT,
      username: envs.DATABASE_USERNAME,
      password: envs.DATABASE_PASSWORD,
      database: envs.DATABASE_NAME,
      synchronize: true,
      autoLoadEntities: true,
      // ssl: {
      //   rejectUnauthorized: false,
      // },
      // extra: {
      //   max: 10,
      //   connectionTimeoutMillis: 2000,
      //   idleTimeoutMillis: 30000,
      // },
    }),

    TypeOrmModule.forFeature([
      Role,
      Permission,
      User
    ]),
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export class PgModule {}
