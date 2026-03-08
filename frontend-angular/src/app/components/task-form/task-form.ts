import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  title: string = '';
  description: string = '';
  status: 'TODO' | 'IN_PROGRESS' | 'DONE' = 'TODO';

  @Output() taskCreated = new EventEmitter<void>();

  constructor(private taskService: TaskService) { }

  onSubmit() {
    if (!this.title.trim()) return;

    const newTask: Task = {
      title: this.title,
      description: this.description,
      status: this.status
    };

    this.taskService.createTask(newTask).subscribe(() => {
      this.title = '';
      this.description = '';
      this.status = 'TODO';
      this.taskCreated.emit();
    });
  }
}
