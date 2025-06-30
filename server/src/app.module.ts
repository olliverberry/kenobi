import { Module } from '@nestjs/common';
import { PovsController } from './povs/povs.controller';
import { PovsService } from './povs/povs.service';
import { ScansController } from './scans/scans.controller';
import { ScansService } from './scans/scans.service';
import { UsersController } from './users/users.controller';

@Module({
  imports: [],
  controllers: [PovsController, ScansController, UsersController],
  providers: [PovsService, ScansService],
})
export class AppModule {}
