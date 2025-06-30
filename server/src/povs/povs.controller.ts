import { Controller, Get, Param } from '@nestjs/common';
import { PovsService } from './povs.service';
import { ApiResponse } from '../lib/api-response.interface';

@Controller('povs')
export class PovsController {
    constructor(private readonly povsService: PovsService) {}

    @Get()
    getPovs(): ApiResponse<any[]> {
        try {
            const povs = this.povsService.getPovs();
            return {
                data: povs,
                success: true
            };
        } catch (error) {
            return {
                data: [],
                success: false,
                message: error instanceof Error ? error.message : 'Failed to fetch POVs'
            };
        }
    }

    @Get(':povId')
    getPov(@Param('povId') povId: string): ApiResponse<any> {
        try {
            const pov = this.povsService.getPov(povId);
            if (!pov) {
                return {
                    data: null,
                    success: false,
                    message: 'POV not found'
                };
            }
            return {
                data: pov,
                success: true
            };
        } catch (error) {
            return {
                data: null,
                success: false,
                message: error instanceof Error ? error.message : 'Failed to fetch POV'
            };
        }
    }
}
