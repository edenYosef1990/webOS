import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDraggable]',
  standalone: true,
})
export class DraggableDirective implements AfterViewInit, OnDestroy {
  @Input('appDraggableHandle') handleSelector = '';

  private handleEl?: HTMLElement;
  private moveListener: (() => void) | null = null;
  private upListener: (() => void) | null = null;
  private offsetX = 0;
  private offsetY = 0;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const nativeEl = this.el.nativeElement;
    this.handleEl = this.handleSelector
      ? (nativeEl.querySelector(this.handleSelector) as HTMLElement | null) || undefined
      : nativeEl;
    if (this.handleEl) {
      this.handleEl.addEventListener('mousedown', this.onMouseDown);
      this.handleEl.style.cursor = 'move';
    }
  }

  ngOnDestroy() {
    this.handleEl?.removeEventListener('mousedown', this.onMouseDown);
    this.removeListeners();
  }

  private onMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    const nativeEl = this.el.nativeElement;
    this.offsetX = event.clientX - nativeEl.offsetLeft;
    this.offsetY = event.clientY - nativeEl.offsetTop;
    this.moveListener = this.renderer.listen('document', 'mousemove', this.onMouseMove);
    this.upListener = this.renderer.listen('document', 'mouseup', this.onMouseUp);
  };

  private onMouseMove = (event: MouseEvent) => {
    this.renderer.setStyle(this.el.nativeElement, 'left', `${event.clientX - this.offsetX}px`);
    this.renderer.setStyle(this.el.nativeElement, 'top', `${event.clientY - this.offsetY}px`);
  };

  private onMouseUp = () => {
    this.removeListeners();
  };

  private removeListeners() {
    if (this.moveListener) {
      this.moveListener();
      this.moveListener = null;
    }
    if (this.upListener) {
      this.upListener();
      this.upListener = null;
    }
  }
}

