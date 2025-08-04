import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.css'
})
export class TerminalComponent {
  @Output() closed = new EventEmitter<void>();
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  lines: string[] = [];
  current = '';

  handleEnter() {
    if (this.current.trim().length > 0) {
      this.lines.push(this.current);
    }
    this.current = '';
    setTimeout(() => this.input.nativeElement.focus());
  }

  focusInput() {
    this.input.nativeElement.focus();
  }
}
