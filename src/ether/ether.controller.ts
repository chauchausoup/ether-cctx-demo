import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ethers } from 'ethers';
import { ApiParam, ApiTags } from '@nestjs/swagger'; // Import Swagger decorators

@ApiTags('Ether') // Use ApiTags decorator to specify controller tag
@Controller('ether')
export class EtherController {
  @ApiParam({
    name: 'address',
    description: 'Ethereum address to be validated',
  }) // Use ApiParam decorator for parameter description
  @Get('validate/:address')
  validateAddress(@Param('address') address: string): string {
    if (!ethers.isAddress(address)) {
      throw new NotFoundException('Invalid Ethereum address');
    }

    return 'Valid Ethereum address';
  }
}
