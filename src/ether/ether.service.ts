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

  async getLatestTransactions(count: number): Promise<any[]> {
    try {
      const ethereumNode = `${process.env.INFURA_ENDPOINT}`;
      const provider = new ethers.JsonRpcProvider(ethereumNode);

      const latestBlockNumber = await provider.getBlockNumber();
      const transactions = [];
      let accumulatedTransactions = 0;
      let blockNumber = latestBlockNumber;

      while (accumulatedTransactions < count) {
        const block = await provider.getBlock(blockNumber);

        for (const txHash of block.transactions) {
          const tx = await provider.getTransaction(txHash);

          transactions.push({
            hash: tx.hash,
            sender: tx.from,
            receiver: tx.to || 'Contract',
            amountOfEther: ethers.formatEther(tx.value),
            blockNumber: tx.blockNumber,
          });

          accumulatedTransactions++;

          if (accumulatedTransactions >= count) {
            break;
          }
        }

        blockNumber--;
      }

      transactions.sort(
        (a, b) => parseFloat(b.amountOfEther) - parseFloat(a.amountOfEther),
      );

      return transactions;
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
      throw new Error('Failed to fetch transactions.');
    }
  }
}
