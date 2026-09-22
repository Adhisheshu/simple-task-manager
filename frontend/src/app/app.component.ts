import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly taskService = inject(TaskService);

  tasks: Task[] = [];
  loading = false;
  saving = false;
  errorMessage = '';

  readonly taskForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    description: ['', [Validators.maxLength(2000)]]
  });

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.errorMessage = '';
    this.taskService.getTasks().subscribe({
      next: tasks => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Unable to load tasks. Please make sure the backend is running.';
      }
    });
  }

  submit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const { title, description } = this.taskForm.getRawValue();
    this.saving = true;
    this.errorMessage = '';

    this.taskService.createTask({
      title: title.trim(),
      description: description.trim() || undefined
    }).subscribe({
      next: task => {
        this.tasks = [task, ...this.tasks];
        this.taskForm.reset();
        this.saving = false;
      },
      error: error => {
        this.saving = false;
        this.errorMessage = error?.error?.message ?? 'Unable to create the task.';
      }
    });
  }

  isInvalid(controlName: 'title' | 'description'): boolean {
    const control = this.taskForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
}
