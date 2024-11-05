import { Resolver } from '@nestjs/graphql';
import { LeaseService } from './lease.service';

@Resolver()
export class LeaseResolver {
  constructor(private readonly leaseService: LeaseService) {}
}
