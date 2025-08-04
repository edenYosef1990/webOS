import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from '../apps/terminal/terminal.component';

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [CommonModule, TerminalComponent],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css'
})
export class DesktopComponent {
  terminalOpen = false;

  openTerminal() {
    this.terminalOpen = true;
  }

  closeTerminal() {
    this.terminalOpen = false;
  }

  @HostListener('document:keydown.control.alt.t', ['$event'])
  handleShortcut(event: KeyboardEvent) {
    event.preventDefault();
    this.openTerminal();
  }
}

