import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('auth_users')
export class AuthUser {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Email único del usuario
  @Column({ type: 'varchar', length: 150, unique: true })
  email: string;

  // Contraseña encriptada del usuario
  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  // Token de autenticación de Auth0
  @Column({ type: 'varchar', length: 255, nullable: true })
  auth0Token: string;

  // ID del usuario en Auth0
  @Column({ type: 'varchar', length: 255, nullable: true })
  auth0UserId: string;

  // Indica si el usuario ha verificado su correo
  @Column({ type: 'boolean', default: false })
  isEmailVerified: boolean;

  // Fecha de la última autenticación
  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date;

  // Token de refresco de Auth0
  @Column({ type: 'varchar', length: 255, nullable: true })
  refreshToken: string;

  // Token de autenticación de terceros (por ejemplo, Google, Facebook)
  @Column({ type: 'varchar', length: 255, nullable: true })
  thirdPartyAuthToken: string;

  // Proveedor de autenticación (Auth0, Google, Facebook, etc.)
  @Column({ type: 'varchar', length: 50, nullable: true })
  authProvider: string;

  // Rol del usuario
  @Column({ type: 'enum', enum: ['landlord', 'tenant', 'admin'] })
  role: 'landlord' | 'tenant' | 'admin';

  // Estado activo o inactivo del usuario
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

}
