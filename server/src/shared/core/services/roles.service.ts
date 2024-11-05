import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@root/features/user/entities/user.entity';
import { Repository, In } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { Role } from '../entities/roles.entity';
import { UserRole } from '@root/shared/enum/roles.enum';
import { tenantPermissions } from '../constants/tenantPermissions';
import { landlordPermissions } from '../constants/landlordPermissions';
import { adminPermissions } from '../constants/adminPermissions';
import { permissionNames } from '../constants/permissionNames';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  // Inicializa los roles y permisos
  async initializeRolesAndPermissions() {
    // Crea permisos si no existen
    for (const permissionName of permissionNames) {
      let permission = await this.permissionRepository.findOne({
        where: { name: permissionName },
      });
      if (!permission) {
        permission = this.permissionRepository.create({ name: permissionName });
        await this.permissionRepository.save(permission);
      }
    }

    await this.createRole(UserRole.ADMIN, adminPermissions);

    await this.createRole(UserRole.LANDLORD, landlordPermissions);

    await this.createRole(UserRole.TENANT, tenantPermissions);
  }

  async createRole(roleName: string, permissionNames: string[]): Promise<Role> {
    let role = await this.roleRepository.findOne({
      where: { name: roleName },
      relations: ['permissions'],
    });
    if (!role) {
      role = this.roleRepository.create({ name: roleName });
    }

    const permissions = await this.permissionRepository.find({
      where: { name: In(permissionNames) },
    });

    role.permissions = permissions;
    return this.roleRepository.save(role);
  }

  // Verificar si un usuario tiene un permiso específico
  async userHasPermission(
    userId: string,
    permissionName: string,
  ): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles', 'roles.permissions'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.roles.some((role) =>
      role.permissions.some((permission) => permission.name === permissionName),
    );
  }

  // Verificar si un usuario tiene un rol específico
  async userHasRole(userId: string, roleName: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.roles.some((role) => role.name === roleName);
  }

  // Asignar un rol a un usuario
  async assignRole(userId: string, roleName: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const role = await this.roleRepository.findOne({
      where: { name: roleName },
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    // Verificar si el usuario ya tiene el rol asignado
    if (user.roles.some((existingRole) => existingRole.id === role.id)) {
      throw new BadRequestException('User already has this role');
    }

    user.roles.push(role);
    await this.userRepository.save(user);
  }

  // Revocar un rol de un usuario
  async revokeRole(userId: string, roleName: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const role = await this.roleRepository.findOne({
      where: { name: roleName },
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    // Verificar si el usuario tiene el rol asignado
    const roleIndex = user.roles.findIndex(
      (existingRole) => existingRole.id === role.id,
    );
    if (roleIndex === -1) {
      throw new BadRequestException('User does not have this role');
    }

    user.roles.splice(roleIndex, 1);
    await this.userRepository.save(user);
  }

  async updateRolePermissions(
    roleName: string,
    newPermissions: string[],
  ): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { name: roleName },
      relations: ['permissions'],
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const permissions = await this.permissionRepository.find({
      where: { name: In(newPermissions) },
    });

    role.permissions = permissions;
    return this.roleRepository.save(role);
  }

  async listAllPermissions(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  async listAllRoles(): Promise<Role[]> {
    return this.roleRepository.find({ relations: ['permissions'] });
  }
}
