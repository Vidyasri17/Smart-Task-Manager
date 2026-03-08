import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<number>();
  @Output() statusChange = new EventEmitter<{ id: number, status: string }>();

  onDelete() {
    if (this.task.id) {
      this.delete.emit(this.task.id);
    }
  }

  onStatusChange(event: Event) {
    const newStatus = (event.target as HTMLSelectElement).value;
    if (this.task.id) {
      this.statusChange.emit({ id: this.task.id, status: newStatus });
    }
  }
}
