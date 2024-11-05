import { Field, registerEnumType } from '@nestjs/graphql';
import { Role } from '@root/shared/core/entities/roles.entity';
import { UserRole } from '@root/shared/enum/roles.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';


registerEnumType(UserRole, {
  name: 'UserRole',
});

@Entity('users')
export class User {
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
  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;

  // Opcional: Número de identificación
  @Column({ type: 'varchar', length: 50, nullable: true })
  idNumber: string;

  // Opcional: Nacionalidad
  @Column({ type: 'varchar', length: 100, nullable: true })
  nationality: string;

  // Opcional: Ingresos mensuales
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  monthlyIncome: number;

  // Opcional: Ocupación
  @Column({ type: 'varchar', length: 100, nullable: true })
  occupation: string;

  // Opcional: Compañía o empleador
  @Column({ type: 'varchar', length: 150, nullable: true })
  employer: string;

  // Opcional: Antigüedad laboral
  @Column({ type: 'int', nullable: true })
  employmentDuration: number;

  // Opcional: Número de dependientes
  @Column({ type: 'int', nullable: true })
  numberOfDependents: number;

  // Opcional: Estado civil
  @Column({ type: 'varchar', length: 50, nullable: true })
  maritalStatus: string;

  // Opcional: Referencia bancaria
  @Column({ type: 'varchar', length: 255, nullable: true })
  bankReference: string;

  // Opcional: Historial de arrendamiento
  @Column({ type: 'text', nullable: true })
  rentalHistory: string;

  // Opcional: Contacto de emergencia
  @Column({ type: 'varchar', length: 100, nullable: true })
  emergencyContact: string;

  // Opcional: Relación del contacto de emergencia
  @Column({ type: 'varchar', length: 50, nullable: true })
  emergencyContactRelationship: string;

  // Opcional: Teléfono del contacto de emergencia
  @Column({ type: 'varchar', length: 15, nullable: true })
  emergencyContactPhone: string;

  // Opcional: Mascotas
  @Column({ type: 'text', nullable: true })
  pets: string;

  // Opcional: Necesidades de accesibilidad
  @Column({ type: 'text', nullable: true })
  accessibilityNeeds: string;

  // Opcional: Nivel educativo
  @Column({ type: 'varchar', length: 100, nullable: true })
  educationLevel: string;

  // Opcional: Referencias personales
  @Column({ type: 'text', nullable: true })
  personalReferences: string;

  // Opcional: Historial crediticio
  @Column({ type: 'text', nullable: true })
  creditHistory: string;

  // Opcional: Dirección anterior
  @Column({ type: 'varchar', length: 255, nullable: true })
  previousAddress: string;

  // Opcional: Tiempo en dirección actual
  @Column({ type: 'int', nullable: true })
  timeAtCurrentAddress: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  // Opcional: Tipo de vivienda actual
  @Column({ type: 'varchar', length: 50, nullable: true })
  currentHousingType: string;

  // Opcional: Razón para mudarse
  @Column({ type: 'text', nullable: true })
  reasonForMoving: string;

  // Opcional: Preferencias de contrato
  @Column({ type: 'text', nullable: true })
  leasePreferences: string;

  // Opcional: Tipo de propiedad preferido
  @Column({ type: 'varchar', length: 50, nullable: true })
  preferredPropertyType: string;

  // Opcional: Tamaño de la familia
  @Column({ type: 'int', nullable: true })
  familySize: number;

  // Opcional: Historial de pagos
  @Column({ type: 'text', nullable: true })
  paymentHistory: string;

  // Opcional: Presupuesto máximo
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  maximumBudget: number;

  // Opcional: Preferencias de ubicación
  @Column({ type: 'varchar', length: 255, nullable: true })
  locationPreferences: string;

  // Opcional: Requerimientos de estacionamiento
  @Column({ type: 'boolean', nullable: true })
  requiresParking: boolean;

  // Opcional: Permite compartir vivienda
  @Column({ type: 'boolean', nullable: true })
  willingToShareHousing: boolean;

  // Opcional: Preferencias de vecinos
  @Column({ type: 'text', nullable: true })
  neighborPreferences: string;

  // Opcional: Nivel de ruido aceptable
  @Column({ type: 'varchar', length: 50, nullable: true })
  noiseTolerance: string;

  // Opcional: Requerimientos de internet
  @Column({ type: 'boolean', nullable: true })
  requiresInternet: boolean;

  // Opcional: Presupuesto para servicios públicos
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  utilityBudget: number;

  // Opcional: Preferencias de amueblado
  @Column({ type: 'varchar', length: 50, nullable: true })
  furnishingPreferences: string;

  // Opcional: Requerimientos de seguridad
  @Column({ type: 'text', nullable: true })
  securityRequirements: string;

  // Opcional: Idiomas hablados
  @Column({ type: 'varchar', length: 100, nullable: true })
  languagesSpoken: string;

  // Opcional: Preferencias de mascotas permitidas
  @Column({ type: 'boolean', nullable: true })
  allowsPets: boolean;

  // Opcional: Preferencias de transporte
  @Column({ type: 'text', nullable: true })
  transportationPreferences: string;

  // Opcional: Estado de salud general
  @Column({ type: 'text', nullable: true })
  healthCondition: string;

  // Opcional: Preferencia de clima
  @Column({ type: 'varchar', length: 50, nullable: true })
  climatePreference: string;

  // Opcional: Preferencias de cocina
  @Column({ type: 'varchar', length: 100, nullable: true })
  kitchenPreferences: string;

  // Opcional: Preferencia por pisos bajos o altos
  @Column({ type: 'varchar', length: 50, nullable: true })
  floorPreference: string;

  // Opcional: Horarios de trabajo o estudio
  @Column({ type: 'text', nullable: true })
  workOrStudySchedule: string;

  // Opcional: Requerimientos de gimnasio
  @Column({ type: 'boolean', nullable: true })
  requiresGym: boolean;

  // Opcional: Requerimientos de piscina
  @Column({ type: 'boolean', nullable: true })
  requiresPool: boolean;

  // Opcional: Preferencia de orientación (Norte, Sur, etc.)
  @Column({ type: 'varchar', length: 20, nullable: true })
  orientationPreference: string;

  // Opcional: Tiempo estimado de permanencia en la propiedad
  @Column({ type: 'int', nullable: true })
  estimatedStayDuration: number;

  // Opcional: Preferencia de tipo de iluminación
  @Column({ type: 'varchar', length: 50, nullable: true })
  lightingPreference: string;

  // Opcional: Preferencias de actividades recreativas cercanas
  @Column({ type: 'text', nullable: true })
  nearbyRecreationalPreferences: string;

  // Opcional: Preferencias de transporte público cercano
  @Column({ type: 'text', nullable: true })
  publicTransportPreferences: string;

  // Opcional: Preferencias de centros comerciales cercanos
  @Column({ type: 'boolean', nullable: true })
  requiresNearbyShoppingCenters: boolean;

  // Opcional: Requerimientos de balcones o terrazas
  @Column({ type: 'boolean', nullable: true })
  requiresBalconyOrTerrace: boolean;

  // Opcional: Preferencias de privacidad en la propiedad
  @Column({ type: 'text', nullable: true })
  privacyPreferences: string;

  // Opcional: Requerimientos de espacio de almacenamiento adicional
  @Column({ type: 'boolean', nullable: true })
  requiresExtraStorage: boolean;

  // Opcional: Preferencias de mascotas de vecinos
  @Column({ type: 'boolean', nullable: true })
  neighborPetsTolerance: boolean;

  // Opcional: Preferencia de vistas (montaña, ciudad, etc.)
  @Column({ type: 'varchar', length: 100, nullable: true })
  viewPreference: string;

  // Opcional: Preferencias de acceso a áreas verdes
  @Column({ type: 'boolean', nullable: true })
  requiresGreenAreas: boolean;

  // Opcional: Requerimientos de acceso a servicios médicos cercanos
  @Column({ type: 'boolean', nullable: true })
  requiresNearbyMedicalServices: boolean;

  // Opcional: Preferencias de redes sociales o comunidades locales
  @Column({ type: 'text', nullable: true })
  communityEngagementPreferences: string;

  // Opcional: Preferencias de actividades al aire libre
  @Column({ type: 'text', nullable: true })
  outdoorActivityPreferences: string;

  // Opcional: Preferencias de comunidad (tranquila, familiar, etc.)
  @Column({ type: 'varchar', length: 50, nullable: true })
  communityTypePreference: string;

  // Opcional: Requerimientos de calefacción en la propiedad
  @Column({ type: 'boolean', nullable: true })
  requiresHeating: boolean;

  // Opcional: Requerimientos de aire acondicionado
  @Column({ type: 'boolean', nullable: true })
  requiresAirConditioning: boolean;

  // Opcional: Preferencia de colores de decoración
  @Column({ type: 'varchar', length: 100, nullable: true })
  colorPreference: string;

  // Opcional: Preferencias de mobiliario en cocina (isla, mesones, etc.)
  @Column({ type: 'text', nullable: true })
  kitchenFurniturePreferences: string;

  // Opcional: Preferencias de seguridad en la propiedad
  @Column({ type: 'text', nullable: true })
  propertySecurityPreferences: string;

  // Opcional: Preferencia de pisos de la propiedad
  @Column({ type: 'varchar', length: 20, nullable: true })
  flooringTypePreference: string;

  // Opcional: Preferencia de armarios empotrados
  @Column({ type: 'boolean', nullable: true })
  requiresBuiltInClosets: boolean;

  // Opcional: Requerimiento de acceso para bicicletas
  @Column({ type: 'boolean', nullable: true })
  requiresBicycleAccess: boolean;

  // Opcional: Preferencias de espacio al aire libre privado (patio, jardín)
  @Column({ type: 'boolean', nullable: true })
  requiresPrivateOutdoorSpace: boolean;

  // Opcional: Preferencias de iluminación natural
  @Column({ type: 'boolean', nullable: true })
  prefersNaturalLighting: boolean;

  // Opcional: Requerimientos de ventanas grandes
  @Column({ type: 'boolean', nullable: true })
  requiresLargeWindows: boolean;

  // Opcional: Preferencia de ambientes de trabajo o estudio
  @Column({ type: 'boolean', nullable: true })
  requiresOfficeSpace: boolean;

  // Opcional: Preferencias de baños adicionales
  @Column({ type: 'int', nullable: true })
  preferredExtraBathrooms: number;

  // Opcional: Requerimientos de accesibilidad para sillas de ruedas
  @Column({ type: 'boolean', nullable: true })
  wheelchairAccessible: boolean;

  // Opcional: Preferencias de materiales de construcción
  @Column({ type: 'varchar', length: 100, nullable: true })
  constructionMaterialPreference: string;

  // Opcional: Requerimientos de aislamiento de ruido
  @Column({ type: 'boolean', nullable: true })
  requiresSoundproofing: boolean;

  // Opcional: Preferencia por diseño ecológico o sustentable
  @Column({ type: 'boolean', nullable: true })
  prefersEcoFriendlyDesign: boolean;

  // Opcional: Requerimientos de electricidad de respaldo
  @Column({ type: 'boolean', nullable: true })
  requiresBackupElectricity: boolean;

  // relations
  
  @Field(() => [Role]) 
  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles', 
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
}
