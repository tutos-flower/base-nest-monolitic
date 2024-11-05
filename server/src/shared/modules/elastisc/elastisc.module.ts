import { Module } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';
import { KibanaService } from './kibana.service';

@Module({
    imports:[],
    providers:[ElasticsearchService,KibanaService],
    exports: [ElasticsearchService, KibanaService]  

})
export class ElastiscModule {}
