import { Directive, ElementRef } from "@angular/core";

@Directive({selector: '[btn]'})
export class ButtonDirective {
    constructor(private el: ElementRef) {}
}