import { Injectable } from '@angular/core';

export interface DesktopApp {
  id: string;
  label: string;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class DesktopService {
  private icons: DesktopApp[] = [
    { id: 'recycle', label: 'Recycle Bin', icon: 'recycle-bin-icon.svg' },
    { id: 'explorer', label: 'File Explorer', icon: 'file-explorer-icon.svg' },
    { id: 'terminal', label: 'Terminal', icon: 'terminal-icon.svg' },
    { id: 'text-editor', label: 'Text Editor', icon: 'text-editor-icon.svg' },
  ];

  private openApps = new Set<string>();

  getApps() {
    return this.icons;
  }

  openApp(id: string) {
    this.openApps.add(id);
  }

  closeApp(id: string) {
    this.openApps.delete(id);
  }

  isAppOpen(id: string) {
    return this.openApps.has(id);
  }
}
