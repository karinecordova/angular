import { Component, HostBinding, HostListener } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ShadowWithColorDirective } from './app/shadow-with-color.directive';
import { ShowErrorFormDirective } from './app/show-error-form.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="box" appShadowWithColor [color]="'red'">Karine Alessandra Córdova</div>
   <br> <br> 
    <form [formGroup]="myForm">
      <div>
        <label for="age">Idade:</label>
        <input id="age" formControlName="age" appShowErrorForm>
      </div>
    </form> 
    <!-- <button type="submit" [disabled]="myForm.invalid">Submit</button> -->
    
  `,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ShadowWithColorDirective,
    ShowErrorFormDirective,
  ],
  styles: `
  .box{
    border: 1px solid #000;
  }
  `,
})
export class App {
  constructor(private fb: FormBuilder) {}

  myForm = this.fb.group({
    age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
  });
}

bootstrapApplication(App);
