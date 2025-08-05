import { Component, HostListener, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesktopService, DesktopApp } from '../desktop.service';

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css'
})
export class DesktopComponent implements AfterViewInit {
  apps: DesktopApp[] = [];
  selectedIcon: string | null = null;

  @ViewChild('appContainer', { read: ViewContainerRef })
  appContainer!: ViewContainerRef;

  constructor(private desktopService: DesktopService) {
    this.apps = this.desktopService.getApps();
  }

  ngAfterViewInit() {
    this.desktopService.registerContainer(this.appContainer);
  }

  openApp(id: string) {
    this.desktopService.openApp(id);
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
