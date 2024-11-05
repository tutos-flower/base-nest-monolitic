import { ElasticsearchTransport } from 'winston-elasticsearch';
import { Client } from '@elastic/elasticsearch';

const esClient = new Client({
    node: 'http://elastic:admin1234@localhost:9200', 
});

const esTransportOpts = {
  level: 'info',
  client: esClient,
  indexPrefix: 'logs', 
};

export const esTransport = new ElasticsearchTransport(esTransportOpts);
