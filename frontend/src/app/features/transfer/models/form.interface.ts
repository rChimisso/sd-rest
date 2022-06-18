import {FormControl} from '@angular/forms';

export interface FormInterface {
  senderId: FormControl<string>;
  recipientId: FormControl<string>;
  amount: FormControl<number>;
}
