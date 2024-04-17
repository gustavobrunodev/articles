import { Directive } from '@angular/core';
import {
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  FormControl,
  AbstractControl,
} from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[validCreditCard]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: CreditCardValidator, multi: true },
  ],
})
export class CreditCardValidator implements Validator {
  // This is the implementation of the Validator interface
  validate(c: FormControl): ValidationErrors | null {
    // All we do is call the static method
    return CreditCardValidator.validateCcNumber(c);
  }

  // This is the static method that does the actual validation
  static validateCcNumber(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return {
        creditCard: '',
      };
    }

    if (
      !(
        control.value.startsWith('37') ||
        control.value.startsWith('4') ||
        control.value.startsWith('5')
      )
    ) {
      // Return error if card is not Amex, Visa or Mastercard
      return {
        creditCard:
          'Your credit card number is not from a supported credit card provider',
      };
    } else if (control.value.length !== 16) {
      console.log(control.value);
      // Return error if length is not 16 digits
      return { creditCard: 'A credit card number must be 16-digit long' };
    }
    // If no error, return null
    return null;
  }
}
