/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class KibanaService {
  private readonly kibanaUrl = process.env.KIBANA_URL || 'http://localhost:5601';
  private readonly kibanaUsername = process.env.KIBANA_USERNAME || 'elastic';
  private readonly kibanaPassword = process.env.KIBANA_PASSWORD || 'admin1234';

  async createIndexPattern(indexPatternTitle: string) {
    const auth = {
      username: this.kibanaUsername,
      password: this.kibanaPassword,
    };

    const indexPatternPayload = {
      attributes: {
        title: indexPatternTitle,
        timeFieldName: '@timestamp',
      },
    };

    try {
      const response = await axios.post(
        `${this.kibanaUrl}/api/saved_objects/index-pattern`,
        indexPatternPayload,
        {
          auth,
          headers: {
            'Content-Type': 'application/json',
            'kbn-xsrf': 'true', 
          },
        },
      );
      // console.log('Index pattern created:', response.data);
    } catch (error) {
      console.error('Error creating index pattern:', error.response ? error.response.data : error.message);
    }
  }
}
