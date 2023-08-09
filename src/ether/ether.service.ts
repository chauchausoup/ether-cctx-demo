import { Injectable } from '@nestjs/common';
import { ethers, Wallet } from 'ethers';

@Injectable()
export class EtherService {
  validateAddress(address: string): boolean {
    return ethers.isAddress(address);
  }

  createWallet(): any {
    const wallet = Wallet.createRandom();
    return wallet;
  }
}
