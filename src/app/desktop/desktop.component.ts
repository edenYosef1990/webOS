import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from '../apps/terminal/terminal.component';
import { FileExplorerComponent } from '../apps/file-explorer/file-explorer.component';

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [CommonModule, TerminalComponent, FileExplorerComponent],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css'
})
export class DesktopComponent {
  terminalOpen = false;
  fileExplorerOpen = false;

  openTerminal() {
    this.terminalOpen = true;
  }

  closeTerminal() {
    this.terminalOpen = false;
  }

  openFileExplorer() {
    this.fileExplorerOpen = true;
  }

  closeFileExplorer() {
    this.fileExplorerOpen = false;
  }

  @HostListener('document:keydown.control.alt.t', ['$event'])
  handleShortcut(event: KeyboardEvent) {
    event.preventDefault();
    this.openTerminal();
  }
}

