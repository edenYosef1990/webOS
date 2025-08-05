import {
  Injectable,
  ComponentRef,
  Type,
  ViewContainerRef,
  ElementRef,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { TerminalComponent } from './apps/terminal/terminal.component';
import { FileExplorerComponent } from './apps/file-explorer/file-explorer.component';
import { TextEditorComponent } from './apps/text-editor/text-editor.component';
import { DraggableDirective } from './draggable.directive';

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

  private container?: ViewContainerRef;
  private componentMap: Record<string, Type<any>> = {
    explorer: FileExplorerComponent,
    terminal: TerminalComponent,
    'text-editor': TextEditorComponent,
  };
  private handleMap: Record<string, string> = {
    explorer: '.explorer-header',
    terminal: '.terminal-header',
    'text-editor': '.editor-header',
  };

  private openAppRefs = new Map<string, ComponentRef<any>>();
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  getApps() {
    return this.icons;
  }

  registerContainer(container: ViewContainerRef) {
    this.container = container;
  }

  openApp(id: string) {
    if (!this.container || this.openAppRefs.has(id)) {
      return;
    }
    const component = this.componentMap[id];
    if (!component) {
      return;
    }
    const ref = this.container.createComponent(component);
    const element = ref.location.nativeElement as HTMLElement;
    const draggable = new DraggableDirective(
      new ElementRef(element),
      this.renderer
    );
    draggable.handleSelector = this.handleMap[id];
    draggable.ngAfterViewInit();
    (ref.instance as any).closed?.subscribe(() => this.closeApp(id));
    ref.onDestroy(() => draggable.ngOnDestroy());
    this.openAppRefs.set(id, ref);
  }

  closeApp(id: string) {
    const ref = this.openAppRefs.get(id);
    if (ref) {
      ref.destroy();
      this.openAppRefs.delete(id);
    }
  }

  isAppOpen(id: string) {
    return this.openAppRefs.has(id);
  }
}
