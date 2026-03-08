import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-task-board',
  imports: [CommonModule, TaskCard],
  templateUrl: './task-board.html',
  styleUrl: './task-board.css',
})
export class TaskBoard implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  getTasksByStatus(status: string): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  onDeleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  onStatusChange(event: { id: number, status: string }) {
    const task = this.tasks.find(t => t.id === event.id);
    if (task) {
      const updatedTask = { ...task, status: event.status as 'TODO' | 'IN_PROGRESS' | 'DONE' };
      this.taskService.updateTask(event.id, updatedTask).subscribe(() => {
        this.loadTasks();
      });
    }
  }
}
