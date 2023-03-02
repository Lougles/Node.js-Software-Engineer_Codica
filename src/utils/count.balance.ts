import { TransactionType } from '../models/transaction.model';

export const countBanksBalance = banks => {
  for (let i = 0; i < banks.length; i++) {
    banks[i].balance = 0;
    for (let j = 0; j < banks[i].transactions.length; j++) {
      if (banks[i].transactions[j].type === TransactionType.CONSUMABLE) {
        banks[i].balance -= banks[i].transactions[j].amount;
      }
      if (banks[i].transactions[j].type === TransactionType.PROFITABLE) {
        banks[i].balance += banks[i].transactions[j].amount;
      }
    }
  }
};
