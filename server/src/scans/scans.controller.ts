import { Controller, Get } from '@nestjs/common';
import { ScansService } from './scans.service';
import { ApiResponse } from '../lib/api-response.interface';

@Controller('scans')
export class ScansController {
  constructor(private readonly scansService: ScansService) {}

  @Get()
  getScans(): ApiResponse<any[]> {
    try {
      const scans = this.scansService.getScans();
      return {
        success: true,
        data: scans,
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        message:
          error instanceof Error ? error.message : 'Failed to fetch scans',
      };
    }
  }
}
