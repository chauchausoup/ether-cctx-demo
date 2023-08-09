import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ethers } from 'ethers';

@Controller('ether')
export class EtherController {
  @Get('validate/:address')
  validateAddress(@Param('address') address: string): string {
    if (!ethers.isAddress(address)) {
      throw new NotFoundException('Invalid Ethereum address');
    }

    return 'Valid Ethereum address';
  }
}
