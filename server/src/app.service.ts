import { Injectable, OnModuleInit } from '@nestjs/common';
import { RolesService } from './shared/core/services/roles.service';

@Injectable()
export class AppService implements OnModuleInit  {
    constructor(private readonly rolesService: RolesService) {}
    async onModuleInit() {
        await this.rolesService.initializeRolesAndPermissions();
        console.log('Roles and Permissions initialized');
      }
}
