import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-project',
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  name: string = 'yolanda';
  shouldBeTrue = false;
  message = 'Default message. Nothing here';
  isLoggedIn = false;
  students: Array<string> = ['John', 'Mary'];
  projects: Array<{ id: number; name: string }> = [];
  randomProject: string = '';
  errorMessage = '';
  loading = false;
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProjects();
  }

  onButtonClick() {
    this.message = 'Message has been changed';
  }

  fetchProjects() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Please login to load projects.';
      return;
    }

    this.errorMessage = '';
    this.loading = true;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get<Array<{ id: number; name: string }>>(`${this.apiUrl}/projects`, { headers })
      .subscribe({
        next: (projects) => {
          this.projects = projects;
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Failed to load projects.';
          this.loading = false;
        }
      });
  }

  getRandomProject() {
    if (this.projects.length === 0) {
      this.randomProject = 'No projects available';
      return;
    }
    const randomIndex = Math.floor(Math.random() * this.projects.length);
    this.randomProject = this.projects[randomIndex].name;
  }
}
