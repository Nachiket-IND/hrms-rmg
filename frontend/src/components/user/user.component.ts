import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Submitted!', this.userForm.value);
      // You can add your submission logic here
    } else {
      console.log('Form is invalid');
      this.userForm.markAllAsTouched();
    }
  }
}
