import {Transaction} from './transaction.interface';
import {Transfer} from './transfer.interface';

export type Movement = Transaction | Transfer;
