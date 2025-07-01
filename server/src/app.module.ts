import { Module } from '@nestjs/common';
import { PovsController } from './povs/povs.controller';
import { PovsService } from './povs/povs.service';
import { ScansController } from './scans/scans.controller';
import { ScansService } from './scans/scans.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [PovsController, ScansController],
  providers: [PovsService, ScansService],
})
export class AppModule {}
