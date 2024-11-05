/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import * as dotenv from 'dotenv';
import { User } from '@root/features/user/entities/user.entity';

dotenv.config();

@Injectable()
export class ElasticsearchService implements OnModuleInit {
  private readonly esClient: Client;

  constructor() {
    this.esClient = new Client({ node: process.env.ELASTIC_SEARCH_URL });
  }

  async onModuleInit() {
    await this.createIndexIfNotExists('my_custom_index', { 
      mappings: {
        properties: {
          id: { type: 'keyword' }, // El id es una cadena (UUID)
          '@timestamp': { type: 'date' },
          username: { type: 'text' },
          email: { type: 'text' },
          role: { type: 'keyword' },
        },
      },
    });
  }

  private async createIndexIfNotExists(index: string, body: any) {
    const exists = await this.esClient.indices.exists({ index });
    if (!exists) {
      await this.esClient.indices.create({ index, body });
      // console.log(`Índice ${index} creado con mapeo correcto`);
    } else {
      // console.log(`Índice ${index} ya existe`);
    }
  }

  async deleteIndex(index: string) {
    const exists = await this.esClient.indices.exists({ index });
    if (exists) {
      await this.esClient.indices.delete({ index });
      // console.log(`Índice ${index} eliminado`);
    }
  }

  async createIndex() {
    await this.esClient.indices.create({
      index: 'my_custom_index', 
      body: {
        mappings: {
          properties: {
            id: { type: 'keyword' }, // El id es una cadena (UUID)
            '@timestamp': { type: 'date' },
            username: { type: 'text' },
            email: { type: 'text' },
            role: { type: 'keyword' },
          },
        },
      },
    });
    // console.log('Índice my_custom_index creado con mapeo correcto'); 
  }

  async createUser(users: User[]) {
    for (const user of users) {
      await this.esClient.index({
        index: 'my_custom_index', 
        id: user.id.toString(), // Asegúrate de que el id sea tratado como una cadena
        body: {
          ...user,
          '@timestamp': new Date(),
        },
      });
    }

    await this.esClient.indices.refresh({ index: 'my_custom_index' }); 
    // console.log('Usuarios creados en Elasticsearch');
  }

  async verifyUsers() {
    const result = await this.esClient.search({
      index: 'my_custom_index', 
      body: {
        query: {
          match_all: {},
        },
      },
    });

    // console.log('Usuarios en Elasticsearch:', result.hits.hits);
  }

  async search(index: string, body: any) {
    const result = await this.esClient.search({
      index,
      body,
    });
    return result.hits.hits.map((hit: any) => hit._source);
  }

  async delete(index: string, id: string) {
    await this.esClient.delete({
      index,
      id,
    });
  }
}
