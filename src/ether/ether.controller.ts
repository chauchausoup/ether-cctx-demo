import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { EtherService } from './ether.service'; // Import EthereumService

@ApiTags('Ether')
@Controller('ether')
export class EtherController {
  constructor(private readonly etherService: EtherService) {} // Inject EthereumService

  @ApiParam({ name: 'address', description: 'Ethereum address' })
  @Get('validate/:address')
  validateAddress(@Param('address') address: string): string {
    if (!this.etherService.validateAddress(address)) {
      throw new NotFoundException('Invalid Ethereum address');
    }

    return 'Valid Ethereum address';
  }
}
