import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appOnScroll]'
})
export class OnScrollDirective {
  constructor() { }
  @HostListener('scroll', ['$event'])
  public onscroll = (e) => {}
}
