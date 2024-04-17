import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CreditCardValidator } from './creditcardvalidator.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule, CreditCardValidator],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  cardControl: FormControl = new FormControl(
    '',
    CreditCardValidator.validateCcNumber
  );

  displayData(value: any) {
    alert(JSON.stringify(value));
  }
}
