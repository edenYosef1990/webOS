import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from '../apps/terminal/terminal.component';
import { FileExplorerComponent } from '../apps/file-explorer/file-explorer.component';
import { TextEditorComponent } from '../apps/text-editor/text-editor.component';
import { DraggableDirective } from '../draggable.directive';
import { DesktopService, DesktopApp } from '../desktop.service';

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [CommonModule, TerminalComponent, FileExplorerComponent, TextEditorComponent, DraggableDirective],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css'
})
export class DesktopComponent {
  apps: DesktopApp[] = [];
  selectedIcon: string | null = null;

  constructor(private desktopService: DesktopService) {
    this.apps = this.desktopService.getApps();
  }

  openApp(id: string) {
    this.desktopService.openApp(id);
  }

  closeApp(id: string) {
    this.desktopService.closeApp(id);
  }

  isAppOpen(id: string) {
    return this.desktopService.isAppOpen(id);
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
    this.openApp('terminal');
  }
}
