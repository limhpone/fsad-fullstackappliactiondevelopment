import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';

  submit() {
    // Simple placeholder for future wiring; keep UX responsive.
    alert('Thanks for reaching out. We will respond soon.');
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
