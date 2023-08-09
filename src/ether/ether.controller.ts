import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
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

  @Get('createWallet')
  createWallet(): any {
    const wallet = this.etherService.createWallet();
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic,
    };
  }

  @ApiParam({ name: 'count', description: 'No of transaction to fetch' })
  @Get('transactions/:count')
  async getLatestTransactions(
    @Param('count', ParseIntPipe) count: number,
  ): Promise<any> {
    if (!count) {
      throw new NotFoundException('Enter a valid count integer');
    }
    return this.etherService.getLatestTransactions(count);
  }
}
