import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from '../apps/terminal/terminal.component';
import { FileExplorerComponent } from '../apps/file-explorer/file-explorer.component';
import { TextEditorComponent } from '../apps/text-editor/text-editor.component';
import { DraggableDirective } from '../draggable.directive';

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [CommonModule, TerminalComponent, FileExplorerComponent, TextEditorComponent, DraggableDirective],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css'
})
export class DesktopComponent {
  terminalOpen = false;
  fileExplorerOpen = false;
  textEditorOpen = false;
  
  selectedIcon: string | null = null;

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

  openTextEditor() {
    this.textEditorOpen = true;
  }

  closeTextEditor() {
    this.textEditorOpen = false;
  }

  selectIcon(icon: string) {
    this.selectedIcon = icon;
  }

  clearSelection() {
    this.selectedIcon = null;
  }

  @HostListener('document:keydown.control.alt.t', ['$event'])
  handleShortcut(event: KeyboardEvent) {
    event.preventDefault();
    this.openTerminal();
  }
}
