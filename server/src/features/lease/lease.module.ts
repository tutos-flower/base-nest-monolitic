import { Module } from '@nestjs/common';
import { LeaseService } from './lease.service';
import { LeaseResolver } from './lease.resolver';

@Module({
  providers: [LeaseResolver, LeaseService],
})
export class LeaseModule {}
