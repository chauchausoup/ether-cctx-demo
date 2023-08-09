import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class EtherService {
  validateAddress(address: string): boolean {
    return ethers.isAddress(address);
  }
}
