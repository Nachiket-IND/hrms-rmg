import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      userId: [''],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      status: ['', Validators.required],
      lastLogin: [''],
      createdAt: [''],
      updatedAt: ['']
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe({
        next: (res) => console.log('User created successfully:', res),
        error: (err) => console.error('Error creating user:', err)
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
