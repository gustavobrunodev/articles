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
  // Adicionamos nossa diretiva à lista de validadores existentes
  providers: [
    { provide: NG_VALIDATORS, useExisting: CreditCardValidator, multi: true },
  ],
})
export class CreditCardValidator implements Validator {
  // Este método é o exigido pela interface do Validador
  validate(c: FormControl): ValidationErrors | null {
    // Tudo o que fazemos é chamar o método estático
    return CreditCardValidator.validateCcNumber(c);
  }

  // Este é o método estático que faz a validação real
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
      // Retorna um erro se o cartão não é Amex, Visa ou Mastercard
      return {
        creditCard:
          'O número do seu cartão de crédito não é de uma operadora de cartão de crédito compatível',
      };
    } else if (control.value.length !== 16) {
      console.log(control.value);
      // Retorna erro se não tiver 16 dígitos
      return { creditCard: 'O número do cartão de crédito deve ter 16 dígitos' };
    }
    // Se não tiver erro, retorna nulo
    return null;
  }
}
