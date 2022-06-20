import {FormControl} from '@angular/forms';

export interface FormInterface {
  accountId: FormControl<string>;
  amount: FormControl<string>;
}
