import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskBoard } from './components/task-board/task-board';
import { TaskForm } from './components/task-form/task-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TaskBoard, TaskForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Smart Task Manager';

  @ViewChild(TaskBoard) taskBoard!: TaskBoard;

  onTaskCreated() {
    this.taskBoard.loadTasks();
  }
}
