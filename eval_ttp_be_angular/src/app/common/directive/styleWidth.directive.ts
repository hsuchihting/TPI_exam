import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appStyleWidth]',
})
export class StyleWidthDirective implements AfterViewInit {
  @Input('appStyleWidth') styleWidth!: string;
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.el.nativeElement.style.minWidth = this.styleWidth;
    this.el.nativeElement.style.width = this.styleWidth;
  }
}
