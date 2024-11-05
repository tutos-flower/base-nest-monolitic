import { Module } from '@nestjs/common';
import { CustomLoggerModule } from './modules/logger/custom-logger.module';
import { AppGraphQLModule } from './modules/graphql/graphql.module';
import { ElastiscModule } from './modules/elastisc/elastisc.module';
import { PgModule } from './modules/pg/pg.module';

@Module({
    imports:[
        CustomLoggerModule,
        // CloudinaryModule,
        AppGraphQLModule,
        ElastiscModule,
        PgModule,

    ]
})
export class SharedModule {}
